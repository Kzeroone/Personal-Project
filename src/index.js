import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store'
import './styles/main.css'


ReactDOM.render(
<Provider store={store}>
    <HashRouter>
        <App />
    </HashRouter>
</Provider>, document.getElementById('root'));
// registerServiceWorker();
