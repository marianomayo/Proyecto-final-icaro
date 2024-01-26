import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import { useCategory } from '../../hooks/useCategoria';
import { useMarca } from '../../hooks/useMarca';
import {errorModal, confirmMessage} from '../../Utilities/Utilities';
import axios from 'axios';

const { Option } = Select;

const inputStyle = { width: '400px' };

const NuevoProducto = () => {
    const { categorias } = useCategory();
    const { marcas } = useMarca();
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        vnombre: '',
        tdescripcion: '',
        fprecio: '',
        nmarca: '',
        idcategoria: '',
        ncantidad: ''
    });
    const [submittable, setSubmittable] = React.useState(false);

    const handleFormSubmit = async (vObj) => {
        try {
            vObj.id_marca = vObj.nmarca;
            form.resetFields();
          
            const response = await axios.post('/Api/product/addProduct', vObj);
            
            if (response.status === 200) {
                const vObjData = await response.data;
                const modal = confirmMessage(vObjData.message);
    
                await new Promise(resolve => {
                    setTimeout(() => {
                        modal.destroy();
                        resolve();
                    }, 2000);
                });
    
                setFormData({
                    vnombre: '',
                    tdescripcion: '',
                    fprecio: '',
                    nmarca: '',
                    idcategoria: '',
                    ncantidad: ''
                });
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.log(error.response.data.message);
            errorModal(error.response.data.message ? error.response.data.message : 'Error desconocido');
        }
    };

    const btnHabilitado = () => {
        return !Object.values(formData).every(value => value !== undefined && value !== '' && value !== null);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout="horizontal" 
            onFinish={handleFormSubmit}  form={form} initialValues={{ remember: true }}
            autoComplete="off"
            >
                <label htmlFor="">Nombre: 
                    <Form.Item name="vnombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' },{ max: 150, message: 'El nombre no puede exceder los 150 caracteres' }]}>
                        <Input style={inputStyle} placeholder='Nombre Producto' 
                        onChange={(e) => setFormData({ ...formData, vnombre: e.target.value })} />
                    </Form.Item>
                </label>
                <label htmlFor="">Descripcion:
                    <Form.Item name="tdescripcion" rules={[{ required: true, message: 'Por favor ingresa la descripción' }]}>
                        <Input.TextArea style={{ width: '400px'}} placeholder='descripcion del producto' 
                        onChange={(e) => setFormData({ ...formData, tdescripcion: e.target.value })} />
                    </Form.Item>
                </label>
                <div style={{display: 'flex', gap: '1rem'}}>

                    <label htmlFor="">Precio: 
                        <Form.Item name="fprecio" rules={[{ required: true, message: 'Por favor ingresa el precio' }]}>
                            <InputNumber style={{ width: '200px'}} placeholder='Precio' 
                            onChange={(value) => setFormData({ ...formData, fprecio: value })} />
                        </Form.Item>
                    </label>
                    <label htmlFor="">Cantidad:
                        <Form.Item name="ncantidad" rules={[{ required: true, message: 'Por favor ingresa la cantidad' }]}>
                            <InputNumber style={{ width: '180px'}} placeholder='Cantidad' 
                            onChange={(value) => setFormData({ ...formData, ncantidad: value })} />
                        </Form.Item>
                    </label>

                </div>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <label htmlFor="">Marca:
                        <Form.Item name="nmarca" rules={[{ required: true, message: 'Por favor selecciona la marca' }]}>
                            <Select style={{ width: '180px'}} onChange={(value) => setFormData({ ...formData, nmarca: value })}>
                                {marcas.map((marca) => (
                                    <Option key={marca.id_marca} value={marca.id_marca}>
                                        {marca.vmarca}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </label>
                    
                    <label htmlFor="">Categoria:
                        <Form.Item name="idcategoria" rules={[{ required: true, message: 'Por favor selecciona la categoría' }]}>
                            <Select style={{ width: '180px'}} onChange={(value, option) => setFormData({ ...formData, idcategoria: value })}>
                                {categorias.map((categoria) => (
                                    <Option key={categoria.idcategoria} value={categoria.idcategoria}>
                                        {categoria.vcategoria}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </label>
                </div>
                
                

                <Form.Item wrapperCol={{ offset: 7, span: 10 }}>
                    <Button type="primary" htmlType="submit" disabled={btnHabilitado()}>
                        Crear Producto
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NuevoProducto;
