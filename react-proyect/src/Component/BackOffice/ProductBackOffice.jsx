import React, { useEffect, useState } from 'react';
import { Table,  Button, Space, Select, InputNumber, Input, DatePicker } from 'antd';
import { useProduct } from '../../hooks/useProduct';
import { useMarca } from '../../hooks/useMarca';
import { useCategory } from '../../hooks/useCategoria';
import { EditOutlined } from '@ant-design/icons';
import {errorModal, confirmMessage} from '../../Utilities/Utilities';
import moment from 'moment';
import axios from 'axios';

const ProductBackOffice = () => {
    const { productData} = useProduct();
    const {marcas} = useMarca();
    const {categorias} = useCategory();
    const [copiedProductData, setCopiedProductData] = useState([]);

    useEffect(() => {
        
        setCopiedProductData([...productData]);        
        
      }, [productData]);


    const handleChange = (value, idProducto, columnName) => {      
        setCopiedProductData((prevCopiedData) =>
        prevCopiedData.map((product) =>
            product.id_producto === idProducto ? { ...product, [columnName]: value } : product
        )
        );
    };


    const edit = async (record) => {

        try {
           
            if(record.boferta === 1 && record.tsofertahasta == undefined || record.tsofertahasta == ''){
                throw  'Debe seleccionar una fecha mediante el ok para la oferta';
            }
            
            console.log(record);
            const response = await axios.put(`/Api/product/editProduct/${record.id_producto}`, record);  
            if(response.status === 200){
              
              const modal = confirmMessage(response.data.message);    
              
              setTimeout(() => {
                  modal.destroy();
              }, 1000);
            }
        } catch (error) {
            
            if (error.response && error.response.data && error.response.data.message) {
                errorModal(error.response.data.message);
            }else if(error.response && error.response.data && error.response.data.msg){
                errorModal(error.response.data.msg);
            }else{
                let msg = '';
                if (error.response && error.response.data && error.response.data.errors) {
                    error.response.data.errors.forEach((err) => {
                        msg += `${err.msg}, \n`;
                    });
                } else {
                    msg = error;
                }
            
                
                errorModal(msg);
            }
            console.log(error)
        }

    
    };



    const columns = [
        { title: 'ID', dataIndex: 'id_producto', key: 'id_producto' },
        {
            title: 'Nombre',
            dataIndex: 'vnombre',
            key: 'vnombre',
            render: (text, record) => (
              <Input
                value={text}
                onChange={(e) => handleChange(e.target.value, record.id_producto, 'vnombre')}
              />
            ),
          },
          {
            title: 'Descripción',
            dataIndex: 'tdescripcion',
            key: 'tdescripcion',
            render: (text, record) => (
              <Input.TextArea
                value={text}
                onChange={(e) => handleChange(e.target.value, record.id_producto, 'tdescripcion')}
              />
            ),
          },
        {
            title: 'Precio',
            dataIndex: 'fprecio',
            key: 'fprecio',
            render: (text, record) => {
              return (
                <InputNumber
                  value={text}
                  onChange={(value) => handleChange(value, record.id_producto, 'fprecio')}
                />
              );
            },
          },
        {
        title: 'Marca',
        dataIndex: 'vmarca',
        key: 'vmarca',
        render: (text, record) => (
            <Select
            defaultValue={text}
            
            onChange={(value) => handleChange(value, record.id_producto, 'id_marca')}
            >            
            {marcas.map((marca) => (
                <Select.Option key={marca.id_marca} value={marca.id_marca}>
                {marca.vmarca}
                </Select.Option>
            ))}
            </Select>
        ),
        },
        {
        title: 'Categoría',
        dataIndex: 'vcategoria',
        key: 'vcategoria',
        render: (text, record) => (
            <Select
            defaultValue={text}
            
            onChange={(value) => handleChange(value, record.id_producto, 'idcategoria')}
            >
            {/* Opciones del select para la categoría */}
            {categorias.map((categoria) => (
                <Select.Option key={categoria.idcategoria} value={categoria.idcategoria}>
                {categoria.vcategoria}
                </Select.Option>
            ))}
            </Select>
        ),
        },
        {
            title: 'Cantidad',
            dataIndex: 'ncantidad',
            key: 'ncantidad',
            render: (text, record) => {
              return (
                <InputNumber
                  value={text}
                  onChange={(value) => handleChange(value, record.id_producto, 'ncantidad')}
                />
              );
            },
        },
        {
            title: 'Oferta',
            dataIndex: 'boferta',
            key: 'boferta',
            render: (text, record) => (
              text === 1 ? (
                <>
                  <Select
                    defaultValue="Si"
                    onChange={(value) => handleChange(value, record.id_producto, 'boferta')}
                  >
                    <Select.Option value={1}>Si</Select.Option>
                    <Select.Option value={0}>No</Select.Option>
                  </Select>
                  {record.boferta === 1 && (
                    <DatePicker
                      showTime
                      value={record.tsofertahasta ? moment(record.tsofertahasta) : null}
                      onChange={(date, dateString) => handleChange(dateString, record.id_producto, 'tsofertahasta')}
                    />
                  )}
                </>
              ) : (
                <Select
                  defaultValue="No"
                  onChange={(value) => handleChange(value, record.id_producto, 'boferta')}
                >
                  <Select.Option value={1}>Si</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )
            ),
          },
        {
        title: 'Acciones',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
            <Space>
            <Button icon={<EditOutlined />} onClick={() => edit(record)}>
                Editar
            </Button>        
            </Space>
        ),
        },
       
    ];

    return (
        <div style={{padding: '20px'}}>
            <Table
            rowKey="id_producto"
            dataSource={copiedProductData}
            columns={columns}
            pagination={false}
            
            />
        </div>
    );
};

export default ProductBackOffice;
