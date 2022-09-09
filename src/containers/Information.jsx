import React, {useRef, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/components/Information.css'

const Information = () => {
    const { state, addToBuyer } = useContext(AppContext);
    const form = useRef(null);
    const navigate = useNavigate();
    const { cart } = state;

    const handleSubmit = () => {
        const formData = new FormData(form.current);
        const buyer = {
            'name':     formData.get('name'),
            'email':    formData.get('email'),
            'address':  formData.get('address'),
            'apto':     formData.get('apto'),
            'city':     formData.get('city'),
            'country':  formData.get('country'),
            'state':    formData.get('state'),
            'cp':       formData.get('cp'),
            'phone':    formData.get('phone'),
        }
        addToBuyer(buyer);
        navigate('/checkout/payment');
    }

    const autoComplete = () => {
        form.current.name.value = 'Frank';
        form.current.email.value = 'frank@email.com';
        form.current.address.value = 'Junin y rocafuerte';
        form.current.apto.value = '77';
        form.current.city.value = 'Machala';
        form.current.country.value = 'Ecuador';
        form.current.state.value = 'Machala';
        form.current.cp.value = '070201';
        form.current.phone.value = '0999999999';
    }

    return (
        <div className="Information">
            <div className="Information-content">
                <div className="Information-head">
                    <h2>Informacion de Contacto</h2>
                </div>
                <div className="Information-form">
                    <form ref={form}>
                        <input type="text" placeholder="Nombre Completo" name="name" />
                        <input type="text" placeholder="Correo Electronico" name="email" />
                        <input type="text" placeholder="Direccion" name="address" />
                        <input type="text" placeholder="Apto" name="apto" />
                        <input type="text" placeholder="Ciudad" name="city" />
                        <input type="text" placeholder="Estado" name="state" />
                        <input type="text" placeholder="Pais" name="country" />
                        <input type="text" placeholder="Codigo Postal" name="cp" />
                        <input type="text" placeholder="Telefono" name="phone" />
                    </form>
                </div>
                <div className="Information-buttons">
                    <div className="Information-back">
                        <Link to="/checkout">
                            Regresar
                        </Link>
                    </div>
                    <button type="button" onClick={autoComplete}>Autocompletar</button>
                    <div className="Information-next">
                        <button type="button" onClick={handleSubmit}>Pagar</button>
                    </div>
                </div>
            </div>
            <div className="Information-sidebar">
                <h3>Pedido: </h3>
                {cart.map(item => (
                    <div key={item.title} className="Checkout-item">
                        <div className="Checkout-element">
                            <h4>{item.title}</h4>
                            <span>$ {item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Information;