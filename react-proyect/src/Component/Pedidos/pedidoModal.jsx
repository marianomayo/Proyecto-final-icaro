import React, { useEffect, useState } from 'react';
import { List, Modal, Spin } from 'antd';
import axios from 'axios';

const PedidoModal = ({ visible, pedido, onClose }) => {
  const [detallesPedido, setDetallesPedido] = useState(null);

  useEffect(() => {
    const cargarDetallesPedido = async () => {
      try {
        
        const response = await axios.get(`/Api/order/getArticulosOrden/${pedido.id_orden_compra}`);
        if (response.status === 200) {
          setDetallesPedido(response.data.data);
        }
      } catch (error) {
        console.error('Error al cargar detalles del pedido:', error);
      }
    };

    if (visible && pedido) {
      cargarDetallesPedido();
    }
  }, [visible, pedido]);

  return (
    <Modal
      title={`Detalle de pedido numero: ${pedido.idpedido}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {detallesPedido ? (
         <List
         dataSource={detallesPedido}
         renderItem={item => (
           <List.Item>
             <List.Item.Meta
               title={item.vnombre}
               description={`Cantidad: ${item.ncantidad}`}
             />
           </List.Item>
         )}
       />
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default PedidoModal;
