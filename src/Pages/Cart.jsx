// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux';
// import { removeFromCart } from '../Action/action';
// import { empty } from '../Action/action';
// import "./Style.css"

// function Cart() {
//      const dispatch = useDispatch();
//      const cartItems = useSelector(state => state.cartReducer);
//   return cartItems.length === 0 ? <h1 style={{
//      textAlign:"center" , color: "red" , marginTop:"100px"
//   }}>Cart Empty</h1> : <div>
//      <button style={{textAlign:"center" , margin:"10px 0 0 200px"} } onClick={()=> dispatch(empty())} >Empty the Cart</button>
//      {
//           cartItems.map((item , ind)=> {
//                return <div className='cart-item'>
//                     <p>[  {ind+1}  ]</p>
//                     <img className='cart-img' src={item.image} alt="" />
//                     <p>${item.price}</p>
//                     <button className='btn' onClick={()=>{
//                          dispatch(removeFromCart(ind))
//                     }}>Remove</button>
//                </div>
//           })
//      }
//   </div>
// }

// export default Cart

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, empty } from '../Action/action';
import './Style.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartReducer);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCart) {
      savedCart.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item }); 
      });
    }
  }, [dispatch]);

  // Update localStorage when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems'); // Clear cart if empty
    }
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleEmptyCart = () => {
    dispatch(empty());
  };

  return cartItems.length === 0 ? (
    <h1 className="empty-cart">Cart Empty</h1>
  ) : (
    <div className="cart-container">
      <button className="empty-cart-btn" onClick={handleEmptyCart}>
        Empty the Cart
      </button>

      {cartItems.map((item, ind) => (
        <div className="cart-item" key={ind}>
          <p>[ {ind + 1} ]</p>
          <img className="cart-img" src={item.image} alt="" />
          <p>${item.price}</p>
          <button
            className="btn"
            onClick={() => handleRemoveItem(ind)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
