import React from 'react';
import './Basket.css';
import './App.css';

export default function Basket(props){
    const {cartItems, onAdd, onRemove, onEmpty, product} = props;

    return (
            <div className="basket noselect">
            {cartItems.length === 0 && <div className="basket-item-description">Your cart is empty.</div>}
            {cartItems.map((item) => (
                <div className="basket-item" key={item.id}>
                    <img className="basket-item-img" src={item.productImages[0].src}/>
                    <div className="basket-item-description">{item.name} <br/> ${item.price} x {item.qty} <b>${item.price * item.qty}</b></div>
                    {/* <a onClick={() => onAdd(product)}>+</a> */}
                    <div onClick={() => onRemove(product)} className="basket-item-delete"> </div>
                </div>
            ))}

            {cartItems.length != 0 && <div className="basket-empty" onClick={() => onEmpty(product)}>Empty basket</div>}
            
        </div>
        );
    
}