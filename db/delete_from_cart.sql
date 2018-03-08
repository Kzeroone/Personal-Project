delete from cart 
where cart.id = $1 and user_idx = 1;
select * from cart where user_idx = 1;