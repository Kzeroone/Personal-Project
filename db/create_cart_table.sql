create table cart (
id serial primary key,
user_idx int references users (id)
);