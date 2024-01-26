
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Table, Tooltip } from 'antd';
import { usePedidos } from '../../hooks/usePedidos';
import {errorModal, confirmMessage} from '../../Utilities/Utilities';
import axios from 'axios';
import { ZoomInOutlined } from '@ant-design/icons';
import PedidoModal from './pedidoModal';

const pedidos = () => {

    const { pedidosData, cargarPedidos } = usePedidos();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    const procesarPedido = async (idPedido) => {
        try {
        
            const response = await axios.post(`/Api/pedido/procesarPedido/${idPedido}`);
         
          if (response.status === 200) {
            const infoResponse = await response.data;   
          
            const modal = confirmMessage(`${infoResponse.msg}`);
        
            
                
            await new Promise(resolve => {
                setTimeout(() => {
                    modal.destroy();

                    resolve();
                }, 2000);
            });

            cargarPedidos();

          }
         
    


        } catch (error) {
          errorModal(error.response.data.message)
        }
      };

      const verPedido = (pedido) => {
       
        setSelectedPedido(pedido);
        setModalVisible(true);
      };
    
      const handleModalClose = () => {        
        setModalVisible(false);
      };

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'vfullname',
            key: 'vfullname',
            render: (text, record) => (
              <>
                <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.id}`} />
                <span style={{ marginLeft: 8 }}>{text}</span>
              </>
            ),
          },
          {
            title: 'Total',
            dataIndex: 'ftotal',
            key: 'ftotal',
            render: (text) => (
              <>
                $ {text}
              </>
            ),
          },
          {
            title: 'Envio',
            dataIndex: 'benvio',
            key: 'benvio',
            render: (text) => (
              <>
                {text === 1 ? 'Sí' : 'No'}
              </>
            ),
          },
          {
            title: 'Procesado',
            dataIndex: 'bprocesado',
            key: 'bprocesado',
            render: (text) => (
              <>
                {text === 1 ? 'Sí' : 'No'}
              </>
            ),
          },
          {
            title: 'Fecha Pedido',
            dataIndex: 'dfechapedido',
            key: 'dfechapedido',           
          },
          {
            title: 'Acciones',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <>
                  {record.bprocesado === 0 && (
                    <a onClick={() => procesarPedido(record.idpedido)}>
                      <Button type="primary">Procesar</Button>
                    </a>
                  )}
                  <span style={{ marginLeft: 8 }}>
                    <a onClick={() => verPedido(record)}>
                      <Tooltip title='Ver pedido'><Button type="default"><ZoomInOutlined /></Button></Tooltip>
                    </a>
                  </span>
                </>
              ),
              
          },
      ];
   
      
    return (
        <>
            <Table
                style={{padding: '15px'}}
                columns={columns}    
                rowKey="idpedido"
                dataSource={pedidosData}
                pagination={false}
            />
              {modalVisible && (
            <PedidoModal
                visible={modalVisible}
                pedido={selectedPedido}
                onClose={handleModalClose}
            />
        )}
        </>
    )
}

export default pedidos;