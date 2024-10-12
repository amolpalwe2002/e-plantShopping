import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const cost = parseFloat(item.cost.replace('$', ''));
            return total + cost * item.quantity;
        }, 0).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrement quantity
        } else {
            handleRemove(item.name); // Remove item if quantity reaches 0
        }
    };

    const handleRemove = (name) => {
        dispatch(removeItem(name)); // Remove item from cart
    };

    const calculateSubtotal = (item) => {
        const cost = parseFloat(item.cost.replace('$', ''));
        return (cost * item.quantity).toFixed(2);
    };

    const handleCheckout = () => {
        alert('Functionality to be added for future reference'); // Placeholder for checkout
    };

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p> // Handle empty cart
                ) : (
                    cartItems.map((item) => (
                        <div className="cart-item" key={item.name}>
                            <img className="cart-image" src={item.image} alt={item.name} />
                            <div className="cart-details">
                                <div className="cart-title">{item.name}</div>
                                <div className="cart-cost">{item.cost}</div>
                                <div className="cart-quantity">
                                    <button onClick={() => handleDecrement(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <div className="cart-subtotal">
                                    Subtotal: ${calculateSubtotal(item)} {/* Display subtotal */}
                                </div>
                                <button onClick={() => handleRemove(item.name)} className="remove-button">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartItems.length > 0 && ( // Show summary only if there are items in the cart
                <div className="cart-summary">
                    <h2>Total Amount: ${calculateTotalAmount()}</h2>
                    <button onClick={handleCheckout} className="checkout-button">Checkout</button>
                    <button onClick={onContinueShopping} className="continue-shopping-button">Continue Shopping</button>
                </div>
            )}
        </div>
    );
}

export default CartItem;
