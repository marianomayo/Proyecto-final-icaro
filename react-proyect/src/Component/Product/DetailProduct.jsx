import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Alert, Layout, List, Avatar, Rate, Button, Form, Input } from 'antd';
import { Descriptions } from 'antd';
import { disponibilidadStock, confirmMessage, errorModal } from '../../Utilities/Utilities';
import './css/DetailProduct.css';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { useUserStore } from '../../Store/useUserStore';
import Sider from 'antd/es/layout/Sider';

const contentStyle = {
    textAlign: 'center',
    width: 500,   
    color: 'black',
    backgroundColor: 'white',
};
const siderStyle = {
    textAlign: 'center',    
    color: 'black',

    backgroundColor: '#F0F3F5',
  };

const DetailProduct = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [error, setError] = useState(null);
    const current_user = useUserStore();
    const [form] = Form.useForm();
    const [comentario, setNewComentario] = useState({
      rate: 'undefined',
      comment: '',
    });
    const [submittable, setSubmittable] = React.useState(false);

    const onFinish = async () => {
        try {
            console.log("entro");
       
          const response = await axios.post('/Api/product/addComentario', {
            id_producto: id,
            nrate: comentario.rate,
            tcomentario: comentario.comment,
          });
         
          if (response.status === 200) {
           
            const modal = confirmMessage(`${response.data.msg}`);    
                            
            await new Promise(resolve => {
                setTimeout(() => {
                    modal.destroy();
                    form.resetFields();
                    setComentarios(response.data.data)
                    resolve();
                }, 2000);
            });

           
           
            
          } else {
            errorModal(error.response.data.msg);
          }
        } catch (error) {
         
          errorModal(error.response.data.msg);
        }
      };

 

    const getProductById = async (id) => {
        try {
            const resp = await axios.get(`/Api/product/getProductById/${id}`);           
            const product = await resp.data;
            return product.data[0];
        } catch (error) {
            setError(error.response ? error.response.data.msg : 'Error desconocido');
            throw error; 
        }
    };

 

    const siderWidth = comentarios.length > 0 ? '40%' : '60%';

    const getComentariosById = async() => {
        const respComentarios = await axios.get(`/Api/product/getComentariosById/${id}`);
        const comentarios = await respComentarios.data;
        return comentarios;
    }

    const values = Form.useWatch([], form);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getProductById(id);
                const comentarios = await getComentariosById(id);
                setProductDetails(details);
                setComentarios(comentarios.data)
            } catch (error) {
                console.error( error);
            }
        };

        form.validateFields({validateOnly: true,}).then(() => {setSubmittable(true);}, () => {setSubmittable(false);},);

        fetchData();
    }, [id, values]);
    
    return (
        <>
            <section className="section-detail">
                {productDetails ? (
                    <>
                        <div>
                            <h1>{productDetails.vnombre}</h1>
                        </div>
                        <figure>
                            <Image width={600} height={400} src={productDetails.vpath} />
                        </figure>
                        <div style={{ marginLeft: '150px' }}>
                            <Descriptions title="Descripcion" column={1}>
                                <Descriptions.Item label="Descripción">
                                    {productDetails.tdescripcion}
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Detalles" column={4}>
                                <Descriptions.Item label="Marca">{productDetails.vmarca}</Descriptions.Item>
                                <Descriptions.Item label="Categoría">{productDetails.vcategoria}</Descriptions.Item>
                                <Descriptions.Item label="Precio">${productDetails.fpreciooferta}</Descriptions.Item>
                                <Descriptions.Item label="Precio">{disponibilidadStock()}</Descriptions.Item>
                            </Descriptions>
                            {productDetails.bofertavalida === 1 && (
                                <Descriptions title="Oferta" column={1}>
                                    <Descriptions.Item label="Oferta Hasta">
                                        {productDetails.dofertahasta}
                                    </Descriptions.Item>
                                </Descriptions>
                            )}
                        </div>                        
                        <Layout>
                            {comentarios.length > 0 ? (<Content style={contentStyle}> 
                            <List
                            style={{ maxHeight: '290px', overflowY: 'auto' }}
                            itemLayout="horizontal"
                            dataSource={comentarios}
                            renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                  title={
                                    <div  style={{ textAlign: 'justify'}}>
                                        <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                                        <span style={{ marginRight: '8px' }}>{item.vnombre}</span>
                                        <Rate disabled value={item.nrate} />
                                    </div>
                                  }
                                  description={
                                    <div style={{ textAlign: 'justify', maxWidth: '70%' }}>
                                      {item.tcomentario}
                                    </div>
                                  }
                                />
                              </List.Item>
                            )}
                            /></Content>) : <div style={{background: 'white'}}>No hay comentarios del producto aun</div>}
                            
                            {current_user.isLogged && !current_user.usuario.administrador ? ( <Sider width={siderWidth} style={siderStyle}>
                                <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}                                
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                                >
                                <Form.Item
                                    label="Calificación"
                                    name="rate"
                                    rules={[{ required: true, message: 'Debe Calificar el producto!' }]}
                                >
                                    <Rate onChange={(value) => setNewComentario({ ...comentario, rate: value })} />
                                </Form.Item>

                                <Form.Item
                                    label="Comentario"
                                    name="comment"
                                    style={{ padding: '10px' }}
                                    rules={[{ required: true, message: 'Por favor. Ingrese un comentario!' }]}
                                >
                                    <Input.TextArea
                                    rows={10}
                                    autoSize={{ minRows: 5, maxRows: 8 }}
                                    style={{ overflowY: 'auto' }}
                                    onChange={(e) => setNewComentario({ ...comentario, comment: e.target.value })}
                                    />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit" disabled={!submittable}>
                                    Enviar
                                    </Button>
                                </Form.Item>
                                </Form>
                            </Sider>) : null}
                           
                         
                        </Layout>
                        
                    </>
                ) : (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        closable
                        />
                )}
            </section>
        </>
    );
};

export default DetailProduct;
