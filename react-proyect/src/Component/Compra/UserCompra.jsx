import React, { useEffect } from 'react';
import useCompraUser from '../../hooks/useCompraUsuario';
import { useUserStore } from '../../Store/useUserStore';
import { Table, Space, Collapse } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;

const UserCompra = () => {
  const compras = useCompraUser();
  const current_user = useUserStore();

  const comprasRealizadas = compras.pedidos;

  useEffect(() => {
    const fetchNotificacionProcesada = async () => {
      try {
        const response = await axios.get('/Api/pedido/notificacionProcesada');
       
        console.log('Notificación procesada:', response.data);
        
      } catch (error) {
        
        console.error('Error al procesar notificación:', error);
      }
    };

    if (compras.cantidadSinProcesar > 0) {
      fetchNotificacionProcesada();
    }
  }, [compras.cantidadSinProcesar]);

  const columns = [
    {
      title: 'Numero de Pedido',
      dataIndex: 'idpedido',
      key: 'idpedido',
    },
    {
      title: 'Total',
      dataIndex: 'ftotal',
      key: 'ftotal',
      render: (text) => <span>$ {text}</span>,
    },
    {
      title: 'Fecha Procesada',
      dataIndex: 'dfechaactualizado',
      key: 'dfechaactualizado',
      render: (text, record) => (
        <span>{record.bprocesado === 0 ? 'Sin Procesar' : text}</span>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Collapse defaultActiveKey={['0']}>
        {record.articulos.map((articulo, index) => (
          <Panel header={articulo.vnombre} key={index}>
            <p>Cantidad: {articulo.ncantidad}</p>
            <p>Precio: ${articulo.fprecio}</p>
          </Panel>
        ))}
      </Collapse>
    </Space>
  );

  return (
    <>
      <Table
        style={{ padding: '10px' }}
        rowKey="idpedido"
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.articulos && record.articulos.length > 0,
        }}
        dataSource={comprasRealizadas}
      />
    </>
  );
};

export default UserCompra;
