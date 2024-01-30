import React, { useEffect, useState } from 'react';
import '../Headers-Footer/css/header-footer.css';
import {Link, useNavigate} from "react-router-dom";
import { Button, Dropdown, Modal, Space } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, ExclamationOutlined, HeartFilled } from '@ant-design/icons';
import { useUserStore } from '../../Store/useUserStore';
import { useCartStore } from '../../Store/useCartStore';
import usePedidosSinProcesarStore from '../../hooks/usePedidoSinProcesar';
import { useFavStore } from '../../Store/useFavStore';
import useCompraUser from '../../hooks/useCompraUsuario';

function Header() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const current_user = useUserStore((state) => state);
  const logout = useUserStore((state) => state.logout);
  const cartState = useCartStore((state) => state);
  const pedidos = usePedidosSinProcesarStore();
  const favUser = useFavStore();
  const pedidosSinProcesar = useCompraUser();
  
  const handleOk = () => {    
    logout();
    cartState.resetCart();
    setOpen(false);
    navigate('/');
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(current_user.isLogged && !current_user.usuario.administrador){

      cartState.getProduct();
      favUser.getFav();

    }else {
     
      cartState.resetCart();
      favUser.resetFav();
    }

    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

    return () => {
      document.querySelector(".btn_menu").removeEventListener("click", toggleMenu);
    };

  }, [current_user, pedidos, pedidosSinProcesar.cantidadSinProcesar]); 


  function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
  }

  const items = [];


if (current_user.isLogged && current_user.usuario.administrador) {
  items.push({
    label: (
      <Link to="/pedidos">
        Pedidos
        {current_user.isLogged && current_user.usuario.administrador && pedidos.data.length > 0? (
            <span className="cart-quantity-pedidos">{pedidos.data.length}</span>
        ) : null}
      </Link>
    ),
    key: '0',
  });
  items.push({
    type: 'divider',
  });
  
}

if(current_user.isLogged && !current_user.usuario.administrador){
  items.push({
    label: (
      <Link to="/favorito">
        Favoritos 
        {favUser.cantidad > 0 && <span className="cart-quantity-favorito"><HeartFilled /> {favUser.cantidad}</span>}
      </Link>
    ),
    key: '0',
  },
  {
    label: (
      <Link to="/tuscompras">
        Tus Compras 
        {pedidosSinProcesar.cantidadSinProcesar > 0 && (
          <ExclamationCircleOutlined style={{ color: 'red', marginLeft: '8px' }} />
        )}
      </Link>
    ),
    key: '1',
  });
  items.push({
    type: 'divider',
  });
}


items.push({
  label: 'Cerrar Sesión',
  key: '3',
  onClick: () => {
    Modal.confirm({
      title: '¿Desea cerrar su sesión?',
      onOk: handleOk,
      onCancel: handleCancel,
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn onClick={handleOk}>Cerrar</OkBtn>
        </>
      ),
    });
  },
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
        {current_user.isLogged ? null : <li  className='hover-effect'><Link to={"/login"}>Ingresar</Link></li>}
        {current_user.isLogged ? null : <li  className='hover-effect'><Link to={"/signup"}>Registrarse</Link></li>}
        {current_user.isLogged && !current_user.usuario.administrador ? (
          <li className='hover-effect'>
            <Link to={"/carrito"}>
              Carrito {cartState.cantidad > 0 && <span className="cart-quantity">{cartState.cantidad}</span>}
            </Link>
          </li>
        ) : null}

        {current_user.isLogged && current_user.usuario.administrador ? <li  className='hover-effect'><Link to={"/backproduct"}>Productos</Link></li> : null}  
        {current_user.isLogged && current_user.usuario.administrador ? <li  className='hover-effect'><Link to={"/nuevoproducto"}>Nuevo Producto</Link></li> : null}  
        {current_user.isLogged ? <li><Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              {current_user.usuario.administrador && (
                <>
                  Admin {current_user.usuario.nombre}
                  {pedidos.data.length > 0 && (
                    <ExclamationCircleOutlined style={{ color: 'red' }} />
                  )}
                </>
              )}
              {!current_user.usuario.administrador && current_user.usuario.nombre}
              <DownOutlined />
              </Space>
            </a>
          </Dropdown></li> : null}
        </ul>
      </div>
    </header>

  );
}

export default Header;
