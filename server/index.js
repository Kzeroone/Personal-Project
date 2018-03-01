require('dotenv').config()
const express = require('express')
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const massive = require('massive');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


const app = express();

app.use(bodyParser.json());

const { SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL } = process.env

app.use( session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))
app.use( express.static( `${__dirname}/../build` ) );
app.use( passport.initialize() );
app.use( passport.session() );

massive(CONNECTION_STRING).then(db =>{
    console.log('DB is CONNECTED!!!!')
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db')

    const { sub, name } = profile._json;
    
    db.find_user([sub]).then(response => {
        console.log(response);
        if(response[0]){
            
            done(null, response[0].id)
        }else{
            db.create_user([name, sub]).then(response => {
                done([null, response[0].id])
            })
            
        }
    })
}))


passport.serializeUser( (id, done) => {
    console.log('ID', id);
    done(null, id)
})
passport.deserializeUser( (id, done) => {
    const db = app.get('db')
    console.log('ID', id)
    db.find_logged_in_user([id]).then(res => {
        done(null, res[0]);
    })
})

//Authorization Endpoints
app.get('/api/auth', passport.authenticate('auth0'));
app.get('/api/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESSREDIRECT
}))

app.get('/api/auth/login', passport.authenticate('auth0', {
    successRedirect: '/api/auth/authenticated', failureRedirect: '/api/auth/login'
}))

app.get('/api/auth/authenticated', (req, res) => {
    if(!req.user){
        res.status(404).send('not logged in bruh')
    }else{
        res.status(200).send(req.user)
    }
})
app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.LOGOUT)
})


//Cart endpoints 
app.get('/api/cart', (req, res) => {
    const db = app.get('db');
    
    db.get_cart().then(response =>{
        res.send( response )
    })
})

app.post('/api/cart/:id', (req, res ) => {
    console.log('User',req.session.passport.user);
    const db = app.get('db');
    db.add_to_cart([req.params.id, req.session.passport.user])
    .then(response => {
        res.send(response);
    })
})

app.put('/api/cart', (req, res) => {
    const db = app.get('db');
    const { quantity } = req.body;
    console.log(req)
    console.log(req.body)
   for(var key in quantity){
    db.update_cart([quantity[key], key])
    .then(response => {
        res.send(response);
    })}
})

app.delete('/api/cart/:id', (req, res) => {
    console.log('hit')
    const db = app.get('db')
    const id = req.params.id

    db.delete_from_cart([id]).then( response =>{
        res.send(response)
    })
})



//Product
app.get('/api/product/:id', (req, res) => {
    const db = app.get('db');
    console.log(req.params.id)
    db.get_product([req.params.id]).then(response => {
        res.send(response[0])
    })
})


//Get All Keyboards/headsets
app.get('/api/keyboards', (req, res) => {
    const db = app.get('db');
    
    db.get_all_keyboards().then(response =>{
        res.send( response )
    })
})


app.get('/api/headsets', (req, res) => {
    const db = app.get('db');
    
    db.get_all_headsets().then(response =>{
        res.send( response )
    })
})

//STRIPE
app.post('/api/payment', (req, res, next) => {
    const amountArray = req.body.amount.toString().split('');
    const convertedAmt = joesPennyFunction(amountArray);
    const charge = stripe.charges.create(
        {
            amount: convertedAmt,
            currency: 'usd',
            source: req.body.token.id,
            description: 'Stripe Checkout test charge'
        },
        function(err, charge) {
            if (err) return res.sendStatus(500);
            else return res.sendStatus(200);
        }
    );
});




app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})
