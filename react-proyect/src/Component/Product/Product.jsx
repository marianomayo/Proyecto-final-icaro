import React from 'react';
import { Button, Card, Image } from 'antd';
import './css/Product.css'
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons'; // Importar iconos de Ant Design
import { cortarTexto, mostrarPrecio } from '../../Utilities/Utilities';
import {Link} from "react-router-dom";

const cardStyle = {
  width: '15rem',
};

const Product = (product) => {
  const shortenedDescription = cortarTexto(product.tdescripcion, 35);
  const displayedPrice = mostrarPrecio(product.fprecio, product.fpreciooferta, product.bofertavalida);

  return (
    <>
      <Card title={product.vnombre} hoverable style={cardStyle} cover={<Image src={product.vpath} />}>
        <Card.Meta title={displayedPrice.precioMostrado} description={shortenedDescription} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginRight: '8px' }}>
            Añadir
          </Button>
          <Button type="default" icon={<EyeOutlined />} style={{ flex: 1 }}>
          <Link to={`detail/${product.id_producto}`}>Detalle</Link>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Product;
