import React, { useEffect } from 'react';
import '../Headers-Footer/css/header-footer.css';

function Header() {

  useEffect(() => {

    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

    return () => {
      document.querySelector(".btn_menu").removeEventListener("click", toggleMenu);
    };
  }, []); 

  function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
  }


  return (
    <header>
      <div className="logo">
        <h1>Teachecommerce</h1>
        <div className="btn_menu">Menu
        </div>
      </div>

      <div className="menu">
        <ul className="navigation">
          <li><a href="/">Home</a></li>
          <li><a href="/">Acerca de Nosotros</a></li>
          <li><a href="/login">Log In</a></li>
          <li><a href="/signup">Registro</a></li>
          <li><a href="/carrito">Mi Carrito</a></li>
        </ul>
      </div>
    </header>

  );
}

export default Header;
