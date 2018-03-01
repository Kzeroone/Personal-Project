create table orders (
id serial primary key,
cart_id int references cart (id)
)