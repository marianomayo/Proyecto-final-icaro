import React from 'react';
import { Button, Card, Image, Tooltip } from 'antd';
import './css/Product.css'
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons'; // Importar iconos de Ant Design
import { cortarTexto, mostrarPrecio, disponibilidadStock } from '../../Utilities/Utilities';
import {Link} from "react-router-dom";
import { useUserStore } from '../../Store/useUserStore';
import { useCartStore } from '../../Store/useCartStore';
import { useFavStore } from '../../Store/useFavStore';

const cardStyle = {
  width: '15rem',
};

const Product = (product) => {
  const shortenedDescription = cortarTexto(product.tdescripcion, 35);
  const displayedPrice = mostrarPrecio(product.fprecio, product.fpreciooferta, product.bofertavalida);
  const current_user = useUserStore((state) => state);
  const disponibilidad = disponibilidadStock(product.ncantidad);
  const addProduct = useCartStore((s) => s.addProduct);
  const addProductToFav = useFavStore((s) => s.addProductToFav)

  return (
    <>
      <Card title={product.vnombre} hoverable style={cardStyle} cover={<Image src={product.vpath} />}>
        <Card.Meta title={displayedPrice.precioMostrado} description={shortenedDescription} />
        <Card.Meta description={disponibilidad}  />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          {current_user.isLogged && !current_user.usuario.administrador && Number(product.ncantidad) >= 1 ? (
            <>
             <div> 
              <Tooltip title="Añadir al Carrito">
                <Button type="primary"  style={{ marginRight: '8px', width:'65px' }} onClick={() => addProduct(product)}>
                  <ShoppingCartOutlined />
                </Button> 
              </Tooltip>
            </div>
            <div>

              <Tooltip title='Añadir a Favorito'><Button type="default" onClick={() => addProductToFav(product)} ><HeartOutlined style={{color: 'red', width:'20px'}} /></Button></Tooltip>
            </div>
            </>
           
            
            ) : null}       
             
             <div>
              <Tooltip title='Detalle del Producto'><Link to={`detail/${product.id_producto}`}><Button type="default"style={{ width: !current_user.isLogged || current_user.usuario.administrador || Number(product.ncantidad) === 0 ? '150px' : '45px' }} ><EyeOutlined />{!current_user.isLogged || current_user.usuario.administrador || Number(product.ncantidad) == 0 ? 'Detalle' : ''}</Button></Link></Tooltip>
             </div>
             

         
          
                  
         
        </div>
      </Card>
    </>
  );
};

export default Product;
