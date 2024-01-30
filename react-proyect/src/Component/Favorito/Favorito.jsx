import React, { useEffect, useState } from 'react';
import { Avatar, Button, Result, Table, Tooltip } from 'antd';
import { useFavStore } from '../../Store/useFavStore';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';

const Favorito = () => {
    const favData = useFavStore((s) => s.fav);    
    const deleteProductFav = useFavStore((s) => s.deleteProductFav);
    const navigate = useNavigate();
    const addProduct = useCartStore((s) => s.addProduct);
    
  
    if(favData.length === 0){
        return (<Result
        title="No posee Articulos en Favorito"
        extra={
          <Button type="primary" key="goHome" onClick={() => navigate('/')}>
            Volver al Home
          </Button>
        }
      />)
    }

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'vnombre',
            key: 'vnombre',
            width: '70%',
            render: (text, record) => (
                <>
                  <Avatar src={`https://picsum.photos/200/300`} />
                  <span style={{ marginLeft: 8 }}>{text}</span>
                </>
              ),
        },
        {
            title: 'Acciones',
            dataIndex: '',
            key: 'idFavorito',
            width: '70%',
            align: 'center',
            render: (text, record) =>   
            <>
                 <>
                    <Tooltip title='Quitar de Favoritos'>
                    <Button type="primary" danger onClick={() => deleteProductFav({ id_producto: record.id_producto })}>
                        <DeleteOutlined />
                    </Button>
                    </Tooltip>
                    <Tooltip title='Añadir al Carrito'>
                    <Button style={{marginLeft: '5px'}} type="primary" onClick={() => addProduct(record)}>
                        <ShoppingCartOutlined></ShoppingCartOutlined>
                    </Button>
                    </Tooltip>
                </>
            </>
        },
    ];

    return (
        <>
            <Table
                style={{padding:'10px'}}
                rowKey="idfavorito"
                columns={columns}
                pagination={false}
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
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={favData}
            />
        </>
    );
};

export default Favorito;
