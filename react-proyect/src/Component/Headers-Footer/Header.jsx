import React, { useEffect, useState } from 'react';
import '../Headers-Footer/css/header-footer.css';
import {Link} from "react-router-dom";
import { Button, Modal, Space } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

function Header() {

  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setIsAuthenticated((prevAuth) => ({ ...prevAuth, isLogged: false }));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {

    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

    return () => {
      document.querySelector(".btn_menu").removeEventListener("click", toggleMenu);
    };
  }, []); 

  function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
  }

 
  const [isAuthenticated, setIsAuthenticated] = useState({
    isLogged: false,
    isAdmin: false,
  });

  return (
    <header>
      <div className="logo">
        <h1>Teachecommerce</h1>
        <div className="btn_menu">Menu
        </div>
      </div>

      <div className="menu">
        <ul className="navigation">
        <li className='hover-effect'><Link to={"/"}>Home</Link></li>
        {isAuthenticated.isLogged ? null : <li  className='hover-effect'><Link to={"/login"}>Ingresar</Link></li>}
        {isAuthenticated.isLogged ? null : <li  className='hover-effect'><Link to={"/signup"}>Registrarse</Link></li>}
        {isAuthenticated.isLogged ? <li  className='hover-effect'><Link to={"/carrito"}>Carrito</Link></li> : null}  
        {isAuthenticated.isLogged ? <li>
          Hola {isAuthenticated.user} <LoginOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
            Modal.confirm({
              title: 'Desea cerrar su sesion?',
              onOk: handleOk, 
              onCancel: handleCancel,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                 
                  <CancelBtn />
                  <OkBtn onClick={handleOk}>Cerrar</OkBtn>
                </>
              ),
            });
          }} />
        </li>   : null}   
        </ul>
      </div>
    </header>

  );
}

export default Header;
