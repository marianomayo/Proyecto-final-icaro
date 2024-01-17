import React, { useState } from 'react';
import '../Cart/css/Cart.css'
import { Avatar, Button, Image, Layout, List, Result, Switch, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';
import { DeleteFilled } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import UserDescription from '../User/UserDescription';
import DescriptionTeach from '../DescriptionTeach/DescriptionTeach';


const Cart = () => {
    const cartProduct = useCartStore((s) => s.cart);
    const precioTotal = useCartStore((s) => s.precioTotal );
    const deleteProduct = useCartStore((s) => s.deleteProduct);
    const [envio, setEnvio] = useState(false);

   
    const navigate = useNavigate();
    const footer = (
        <div className="custom-footer">
          <p>Total de Compra:</p>
          <p>$ {precioTotal}</p>
         
                   
        </div>
    );
    
    const onChangeSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setEnvio(checked);
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
        maxWidth: 'calc(100% - 8px)',
    };
   
    const columns = [       
       
        {
            title: 'Producto',
            dataIndex: 'vnombre',
            key: 'vnombre',
            render: (text, record) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image src={record.vpath}  style={{maxWidth: '30px', maxHeight: '30p', borderRadius: '10px'}}/>
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
            // Nueva columna sin título
            key: 'action',
            render: (text, record) => (
              <Button type="primary" danger onClick={() => deleteProduct({idOrdenCompraxproducto: record.idorden_compra_x_producto, idOrden: record.id_orden_compra})}>
                <DeleteFilled />
              </Button>
            ),
          },

    ];

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
                    <Table  rowKey="id_producto"  columns={columns}   pagination={false}  style={{ maxHeight: '440px', overflowY: 'auto' }}
                        expandable={{
                            expandedRowRender: (record) => (
                            <p
                            style={{
                                margin: 0,
                            }}
                            >
                            {record.tdescripcion}
                            </p>
                        ),
                        rowExpandable: (record) => record.vnombre !== 'Not Expandable',
                        }}
                        dataSource={cartProduct}                        
                    />
                    
                    </section>
                </Sider>
                <Layout>
                
                    <Content style={contentStyle}>
                        <UserDescription></UserDescription>
                        <DescriptionTeach></DescriptionTeach>
                        <p>Le enviamos el producto? Tenga en cuenta el recargo <Switch defaultChecked={envio} onChange={onChangeSwitch} /></p>

                       
                        <div style={{ marginTop: '10px' }}>
                            <ul className='cart-precio-final'>
                                {envio && <li>Envío: $6000</li>}
                                <li>Total de Productos: $ {precioTotal}</li>
                                {envio && <li>Precio Final con Envío: $ {precioTotal + 6000}</li>}
                                {!envio && <li>Precio Final: $ {precioTotal}</li>}
                            </ul>
                        </div>
                        
                        <div style={{ marginTop: '20px', textAlign: 'center'}}>
                            <Button type="primary" >Comprar</Button>
                        </div>
                       
                    </Content>
                
                </Layout>
            </Layout>
    
        </>
      
    );
};

export default Cart;
