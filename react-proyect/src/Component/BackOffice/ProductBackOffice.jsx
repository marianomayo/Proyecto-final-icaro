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
        
      const sortedProducts = [...productData].sort((a, b) =>  b.id_producto -a.id_producto);
      setCopiedProductData(sortedProducts);    
        
      }, [productData]);


    const handleChange = (value, idProducto, columnName) => {      
      const formattedDate = columnName === 'tsofertahasta' ? formatDatePickerValue(value) : value;

      setCopiedProductData((prevCopiedData) =>
        prevCopiedData.map((product) =>
          product.id_producto === idProducto ? { ...product, [columnName]: formattedDate } : product
        )
      );
    };
    const formatDatePickerValue = (value) => {
      return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
    };

    const edit = async (record) => {

        try {
            console.log(record);
            if(record.boferta === 1 && record.tsofertahasta == undefined || record.tsofertahasta == ''){
                throw  'Debe seleccionar una fecha mediante el ok para la oferta';
            }
            
          
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
          title: 'Habilitado',
          dataIndex: 'bhabilitado',
          key: 'bhabilitado',
          render: (text, record) => (
              <Select
                  defaultValue={text === 1 ? "Sí" : "No"}
                  onChange={(value) => handleChange(value, record.id_producto, 'bhabilitado')}
              >
                  <Select.Option value={1}>Sí</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
              </Select>
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
       
        <Table
        rowKey="id_producto"
        dataSource={copiedProductData}
        columns={columns}
        pagination={true}
        
        />
    
    );
};

export default ProductBackOffice;
