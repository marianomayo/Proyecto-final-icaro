import React from 'react';
import '../Cart/css/Cart.css'


const Cart = () => {
    return (
        <section className="cart">
            <h1>Carrito</h1>
            <div className="cart-item">
                <img src="/assets/notebook-prueba.jpg" alt="Producto 1" />

                <p className="product-name">Notebook de prueba</p>
                <button>-</button>
                <input type="number" value="1" readOnly />
                <button>+</button>
                <p className="item-price">$100.000</p>
                <i className="bi bi-trash3"></i>
            </div>
            <div className="cart-item-pay">
                <p className="product-name">Total</p>
                <p className="item-price">$200.000</p>
                <button className="pay-cart">Pagar</button>
            </div>
        </section>
    );
};

export default Cart;
