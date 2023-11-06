import React from 'react';
import { Button } from 'reactstrap';
import { MdDeleteOutline } from "react-icons/md";
function Cart({ cart, removeFromCart }) {
  const cartTotal = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h2>Estos son los Productos que agregaste</h2>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name} - ${item.price}</p>
          <Button color='danger' outline onClick={() => removeFromCart(item)}> <MdDeleteOutline size={30}/> </Button>
        </div>
      ))}
      <p>Total: ${cartTotal.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
