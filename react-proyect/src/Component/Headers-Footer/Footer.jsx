
import React from 'react';
import '../Headers-Footer/css/header-footer.css';

function Footer() {
  return (
  <div>
      <footer>
      <div className="whatsapp-button">
            <a href="" target="_blank">
                <img src="/assets/icons/whatsapp.png" alt="WhatsApp"/>
            </a>
        </div>
        <div className="footer-nav-container">
            <nav className="footer-menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Acerca de Nosotros</a></li>
                    <li><a href="/login">Log In</a></li>
                    <li><a href="/signup">Registro</a></li>
                    <li><a href="/carrito">Mi Carrito</a></li>
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
                    <a href="https://twitter.com/?lang=es"><img src='../../assets/icons/x-logo.jpg' alt="x logo"/></a>
                    <a href="https://www.instagram.com/"><img src="/assets/icons/icono-instagram.jpg" alt="Instagram logo"/></a>
                    <a href="https://www.facebook.com/"><img src="/assets/icons/facebook-icon.png" alt="facebook logo"/></a>
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
  </div>
  );
}

export default Footer;