
import React, { useEffect, useState } from 'react';
import '../Headers-Footer/css/header-footer.css';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../../Store/useUserStore';
import { FacebookOutlined, InstagramOutlined, ShoppingCartOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useCartStore } from '../../Store/useCartStore';
import ModalCartPreview from '../Cart/ModalCartPreview';

function Footer() {

    const current_user = useUserStore();
    const cartState = useCartStore();
    const location = useLocation();
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
    
    useEffect(() => {
        if(current_user.isLogged && !current_user.usuario.administrador){
          cartState.getProduct();
        }else {
          cartState.resetCart();
        }      
      }, [current_user]); 

    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

  return (
  <>
      <footer>
        {current_user.isLogged && !current_user.usuario.administrador && location.pathname !== '/carrito' && cartState.cantidad > 0 ? (
             <div className="cart-button-fixed">
             <div className="cart-icon-container" onClick={openCartModal} >
                 <ShoppingCartOutlined style={{ fontSize: '40px' }} />
                 <div className="cart-quantity-footer">{cartState.cantidad}</div>
             </div>
         </div>
        ): null}
       
        <div className="footer-nav-container">
            <nav className="footer-menu">
                <ul>
                <li><Link to={'/'}>Home</Link></li>
                {current_user.isLogged ? null : <li><a href="/login">Log In</a></li>}
                {current_user.isLogged ? null : <li><a href="/signup">Registro</a></li>}
                {current_user.isLogged && !current_user.usuario.administrador ? <li><Link to={"/carrito"}>Mi Carrito</Link></li> : null}
                {current_user.isLogged && !current_user.usuario.administrador ? <li><Link to={"/favorito"}>Favoritos</Link></li> : null}
                {current_user.isLogged && current_user.usuario.administrador ? <li><Link to={"/backproduct"}>Productos</Link></li> : null}
                {current_user.isLogged && current_user.usuario.administrador ? <li><Link to={"/nuevoproducto"}>Nuevo Producto</Link></li> : null}
                </ul>
            </nav>
        </div>

        <div className="map">
            <iframe  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12691.287306184504!2d-59.138632750000006!3d-37.323047949999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1697199929989!5m2!1ses-419!2sar" width="600" height="250" style={{ border: '0' }} allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="copyright">
            <div className="div-copyright">
                <h4>Copyright 2023</h4>
            </div>
            <div className="img-logo">
                <h4>Seguinos</h4>
                <figure>
                    <TwitterOutlined />
                    <InstagramOutlined/>
                    <FacebookOutlined />
                </figure>
                <div>
                    <p>Comunicate con Nosotros</p>
                    <input type="text" placeholder="Email"/>
                    <textarea name="" id="" cols="30" rows="5" placeholder="Mensaje "></textarea>
                    <button>Enviar</button>
                </div>
            </div>
        </div>

        
    </footer>
    
    <div className="div-copyright-desktop">
        <h3>Copyright 2023</h3>
    </div>
    <ModalCartPreview isVisible={isCartModalOpen} closeModal={closeCartModal} cartDetail={cartState} />
  </>
  );
}

export default Footer;