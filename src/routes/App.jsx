import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Checkout from '../containers/Checkout';
import Home from '../containers/Home';
import Information from '../containers/Information';
import NotFound from '../containers/NotFound';
import Payment from '../containers/Payment';
import Success from '../containers/Sucess';
import { AppContext } from '../context/AppContext';
import { useInitialState } from '../hooks/useInitialState';

const App = () => {
    const initialState = useInitialState();
    // BrowserRouter, permite encapsular toda la navegacion de mi aplicativo
    // Switch: permite mostrar con exactitud la ruta que se esta eligiendo
    // Route: tiene las rutas que se manejaran
    // Al route que solo le paso el componente es para el error 404, page not found
    return (
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/checkout" element={<Checkout />} />
                        <Route exact path="/checkout/information" element={<Information />} />
                        <Route exact path="/checkout/payment" element={<Payment />} />
                        <Route exact path="/checkout/success" element={<Success />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;