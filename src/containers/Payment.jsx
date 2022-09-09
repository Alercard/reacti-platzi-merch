import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { AppContext } from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = () => {
    const { state, addNewOrder } = useContext(AppContext);
    const { cart, buyer } = state;
    const navigate = useNavigate();

    const paypalOptions = {
        //clientId: 'sb-fkzc520751976@business.example.com',
        clientId: 'access_token$sandbox$ybbkpdqd4tm6nyh8$a00236b7973d615648238d248e46306b',
        intent: 'capture',
        currency: 'USD'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    }

    const handleSumTotal = () => {
        const reducer = (accum, currentValue) => accum + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    const handlePaymentSuccess = (data) => {
        console.log('Success:', data);
        if (data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                products: cart,
                payment: data
            }
            addNewOrder(newOrder);
            navigate('/checkout/success')
        }
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: handleSumTotal()
              },
            },
          ],
        });
    };
    const onApprove = (data, actions) => {
        console.group('onAprove');
        console.log(data, actions)
        return actions.order
            .capture()
            .then(function(data) {
                handlePaymentSuccess(data);
            }
        );
      };

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del Pedido</h3>
                {
                    cart.map(item => {
                        <div key={item.title} className="Payment-item">
                            <h4>{item.name}</h4>
                            <span>$ {item.price}</span>
                        </div>
                    })
                }
                <div className="Payment-button">
                    <PayPalButton 
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal()}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={(error) => console.log('Error:', error)}
                        onCancel={(data) => console.log('Cancel:',data)}
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Payment;