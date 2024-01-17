import React, { useEffect } from 'react';
import { Modal,  List, Avatar, Image} from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useCartStore } from '../../Store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';

const ModalCartPreview = ({ isVisible, closeModal, cartDetail }) => {

  const deleteProduct = useCartStore((s) => s.deleteProduct);
  const getProduct = useCartStore((s) => s.getProduct);
  const navigate = useNavigate();

  const handleOk = () => {   
    closeModal();
    navigate('/carrito');
  };

  const handleCancel = () => {
    closeModal();
  };
  const productos = cartDetail.cart;
 
  const title = cartDetail.cantidad > 0 ?  cartDetail.cantidad > 1 ? `Usted tiene ${cartDetail.cantidad} articulos en el Carrito` : `Usted tiene ${cartDetail.cantidad} articulo en el Carrito` : `Su carrito esta vacio`;
  
  return (
    <>
      <Modal title={title} visible={isVisible} onOk={handleOk} onCancel={handleCancel} okText="Ir al Carrito"  cancelText="Seguir Comprando" >
      
        <List
          dataSource={productos}
          style={{ maxHeight: '295px', overflowY: 'auto' }}
          renderItem={(item) => (
            <List.Item key={item.idorden_compra_x_producto}>
              <List.Item.Meta
                avatar={<Image src={item.vpath} style={{maxHeight: '40px', maxWidth: '30px', borderRadius:'30px'}} />}
                title={<a href="https://ant.design">{item.vnombre}</a>}
                description={'Total Pedido: '+  item.ncantidad}
              />
              <div><DeleteFilled style={{fontSize: '25px', color: 'red', cursor:'pointer'}} onClick={() => deleteProduct({idOrdenCompraxproducto: item.idorden_compra_x_producto, idOrden: item.id_orden_compra})}></DeleteFilled></div>
            </List.Item>
          )}
        />
        <h4>{`Total acumulado: $ `+cartDetail.precioTotal}</h4>
      </Modal>
    </>
  );
};

export default ModalCartPreview;
