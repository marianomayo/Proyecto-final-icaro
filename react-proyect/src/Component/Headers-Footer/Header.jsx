import React, { useEffect, useState } from 'react';
import '../Headers-Footer/css/header-footer.css';
import {Link, useNavigate} from "react-router-dom";
import { Button, Modal, Space } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useUserStore } from '../../Store/useUserStore';

function Header() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const current_user = useUserStore((state) => state);
  const logout = useUserStore((state) => state.logout);

  const handleOk = () => {
  
    logout();
    setOpen(false);
    navigate('/');
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
        {current_user.isLogged ? null : <li  className='hover-effect'><Link to={"/login"}>Ingresar</Link></li>}
        {current_user.isLogged ? null : <li  className='hover-effect'><Link to={"/signup"}>Registrarse</Link></li>}
        {current_user.isLogged && !current_user.usuario.administrador ? <li  className='hover-effect'><Link to={"/carrito"}>Carrito</Link></li> : null}  

        {current_user.isLogged && current_user.usuario.administrador ? <li  className='hover-effect'><Link to={"/backproduct"}>Productos</Link></li> : null}  

        {current_user.isLogged ? <li>
          {current_user.usuario.administrador && 'Admin '} {current_user.usuario.nombre}  <LoginOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
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
