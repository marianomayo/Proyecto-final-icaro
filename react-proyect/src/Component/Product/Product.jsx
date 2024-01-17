import React from 'react';
import { Button, Card, Image } from 'antd';
import './css/Product.css'
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons'; // Importar iconos de Ant Design
import { cortarTexto, mostrarPrecio, disponibilidadStock } from '../../Utilities/Utilities';
import {Link} from "react-router-dom";
import { useUserStore } from '../../Store/useUserStore';
import { useCartStore } from '../../Store/useCartStore';

const cardStyle = {
  width: '15rem',
};

const Product = (product) => {
  const shortenedDescription = cortarTexto(product.tdescripcion, 35);
  const displayedPrice = mostrarPrecio(product.fprecio, product.fpreciooferta, product.bofertavalida);
  const current_user = useUserStore((state) => state);
  const disponibilidad = disponibilidadStock(product.ncantidad);
  const addProduct = useCartStore((s) => s.addProduct);

  return (
    <>
      <Card title={product.vnombre} hoverable style={cardStyle} cover={<Image src={product.vpath} />}>
        <Card.Meta title={displayedPrice.precioMostrado} description={shortenedDescription} />
        <Card.Meta description={disponibilidad}  />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        {current_user.isLogged && !current_user.usuario.administrador && Number(product.ncantidad) >= 1 ? (
            <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginRight: '8px' }} onClick={() => addProduct(product)}>
              Añadir
            </Button>
          ) : null}
          
          <Button type="default" icon={<EyeOutlined />} style={{ flex: 1 }}>
          <Link to={`detail/${product.id_producto}`}>Detalle</Link>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Product;
