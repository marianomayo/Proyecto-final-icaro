import React, { useState } from 'react';
import '../Cart/css/Cart.css';
import { Button, Image, Layout, Result, Switch, Table, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';
import { DeleteFilled } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import UserDescription from '../User/UserDescription';
import DescriptionTeach from '../DescriptionTeach/DescriptionTeach';
import Confirm from '../ModalConfirm/Confirm';
import axios from 'axios';

const Cart = () => {
  const cartProduct = useCartStore((s) => s.cart);
  const precioTotal = useCartStore((s) => s.precioTotal);
  const deleteProduct = useCartStore((s) => s.deleteProduct);
  const obtenerCarrito = useCartStore((s) => s.getProduct);
  const [envio, setEnvio] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [result, setResult] = useState({
    state: '',
    title: '',
    response: ''
  });

  const navigate = useNavigate();

  const onChangeSwitch = (checked) => {
    setEnvio(checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsSpinning(true);

    try {
      const response = await axios.post('/Api/pedido/generarPedido', {
        id_orden_compra: cartProduct[0].id_orden_compra,
        ftotal: envio ? precioTotal + 6000 : precioTotal,
        benvio: envio,
      });
    
      if (response.status === 200) {
        setResult({
          state: 'success',
          title: 'Gracias por su Compra',
          response: response.data.msg,
        });

        

        setTimeout(() => {
          setIsSpinning(false);
          setIsModalVisible(false);
          setIsResultVisible(true);

          setTimeout(() => {
            obtenerCarrito();
            navigate('/');
          }, 2000);
        }, 3000);
      } else {
        setIsSpinning(false);
        setIsModalVisible(false);
        setResult({
          state: 'error',
          title: 'Error al general el pedido',
          response: 'Intentelo mas tarde',
        });
        setIsResultVisible(true);
      }
    } catch (error) {
      setIsSpinning(false);
      setIsModalVisible(false);
      setResult({
        state: 'error',
        title: 'Ha surgido un error',
        response: error.response ? error.response.data.msg : 'Error desconocido',
      });
      setIsResultVisible(true);
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsResultVisible(false); 
  };

  const contentStyle = {
    background: 'white'
  };

  const siderStyle = {
    textAlign: 'center',
    background: 'white'
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100% - 8px)',
    maxWidth: 'calc(100% - 8px)'
  };

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'vnombre',
      key: 'vnombre',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={record.vpath} style={{ maxWidth: '30px', maxHeight: '30p', borderRadius: '10px' }} />
          <span style={{ marginLeft: '8px' }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'fprecio',
      align: 'center',
      render: (text) => <span>$ {text}</span>,
    },
    {
      title: 'Cantidad',
      className: 'ncantidad',
      dataIndex: 'ncantidad',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'ftotalprecio',
      align: 'center',
      render: (text) => <span>$ {text}</span>,
    },
    {
      key: 'action',
      render: (text, record) => (
        <Button type="primary" danger onClick={() => deleteProduct({ idOrdenCompraxproducto: record.idorden_compra_x_producto, idOrden: record.id_orden_compra })}>
          <DeleteFilled />
        </Button>
      ),
    },
  ];

  const rowClassName = (record) => {
    return record.bdisponible === 0 ? 'unavailable-row' : '';
  };

  if (cartProduct.length === 0) {
    return (
      <Result
        title="Su carrito esta vacio"
        extra={
          <Button type="primary" key="goHome" onClick={() => navigate('/')}>
            ir a comprar
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width="60%" style={siderStyle}>
          <section className="cart">
            <Table rowKey="id_producto" columns={columns} pagination={false} style={{ maxHeight: '440px', overflowY: 'auto' }}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.tdescripcion}</p>
                ),
                rowExpandable: (record) => record.vnombre !== 'Not Expandable',
              }}
              dataSource={cartProduct}
              rowClassName={rowClassName}
            />
            {cartProduct.some((product) => product.bdisponible === 0) ? (<><h3 style={{ marginTop: '10px', color: 'red' }}>Hay productos que no tienen suficiente stock..</h3></>) : (null)}
          </section>
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <UserDescription></UserDescription>
            <DescriptionTeach></DescriptionTeach>
            <p>Le enviamos el producto? Tenga en cuenta el recargo <Switch defaultChecked={envio} onChange={onChangeSwitch} disabled={cartProduct.some((product) => product.bdisponible === 0)} /></p>
            <div style={{ marginTop: '10px' }}>
              <ul className='cart-precio-final'>
                {envio && <li>Envío: $6000</li>}
                <li>Total de Productos: $ {precioTotal}</li>
                {envio && <li>Precio Final con Envío: $ {precioTotal + 6000}</li>}
                {!envio && <li>Precio Final: $ {precioTotal}</li>}
              </ul>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button type="primary" disabled={cartProduct.some((product) => product.bdisponible === 0)} onClick={showModal}>Comprar</Button>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Confirm title="Confirmar Pedido" isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} data={{ envio, precioTotal }} isSpinning={isSpinning} />
      {isResultVisible && (
        <Modal
          visible={isResultVisible}
          onCancel={() => setIsResultVisible(false)}
          footer={null}
        >
          <Result
            status={result.state}
            title={result.title}
            subTitle={result.response}
            extra={
              result.state === 'success'
                ? [
                  <Button type="primary" key="home" onClick={() => navigate('/')}>
                    Volver al Home
                  </Button>,
                ]
                : [
                  <Button type="primary" key="tryAgain" onClick={() => setIsResultVisible(false)}>
                    Volver
                  </Button>,
                ]
            }
          />
        </Modal>
      )}
    </>
  );
};

export default Cart;
