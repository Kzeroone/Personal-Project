select c.id 
as cart_id, quantity, product_id, name, type, price, image
from cart c
join products p on p.id = c.product_id 
where c.user_idx = $1;