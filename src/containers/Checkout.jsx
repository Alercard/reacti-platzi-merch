import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/components/Checkout.css';

const Checkout = () => {
    const { state, removeFromCart } = useContext(AppContext);
    const { cart } = state;
    console.log(cart)

    const handleRemoveItem = (item) => {
        removeFromCart(item);
    }

    const handleSumTotal = () => {
        const reducer = (accum, currentValue) => accum + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    return (
        <div className="Checkout">
            <div className="Checkout-content">
                {cart.length > 0 ? <h3>Lista de Pedidos</h3> : <h3>Sin Pedidos...</h3> }
                {
                    cart.map(item => (
                        <div key={item.title} className="Checkout-item">
                            <div className="Checkout-element">
                                <h4>{item.title}</h4>
                                <span>$ {item.price}</span>
                            </div>
                            <button type='button' onClick={() => handleRemoveItem(item)}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                    ))
                }
            </div>
            {cart.length > 0 &&
                <div className="Checkout-sidebar">
                    <h3>{`Precio Total: ${handleSumTotal()}`}</h3>
                    <Link to="/checkout/information">
                        <button type="button">Continuar Pedido</button>
                    </Link>
                </div>
            }
        </div>
    );
}

export default Checkout;