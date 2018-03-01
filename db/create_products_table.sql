create table products(
id serial primary key,
name text,
type text,
price int,
order int references orders (id);
);