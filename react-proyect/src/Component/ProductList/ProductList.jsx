import React, { useEffect, useState } from 'react';
import ContainerCard from '../ContainerCard/Container';
import Filtro from '../Filtro/Filtro';
import { useProduct } from '../../hooks/useProduct';
import { Layout, Flex } from 'antd';
import Product from '../Product/Product';
const { Sider, Content } = Layout;


const contentStyle = {
  minHeight: 120,
  lineHeight: '120px',
  color: 'black',
  backgroundColor: 'white',
  paddingLeft: '20px'

};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '50px',
  color: 'black',
  backgroundColor: 'white',
};

const ProductList = () => {
  const { productData } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '',
    precioMinimo: 0,
    precioMaximo: 0,
    marca: '',
    categoria: '',
    orden: ''
  });

  useEffect(() => {
    setFilteredProducts(productData);
  }, [productData]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  useEffect(() => {
    let productosFiltrados = [...productData];

    if (filters.nombre) {
      const searchWords = filters.nombre.toLowerCase().split(' ');
      productosFiltrados = productosFiltrados.filter((producto) =>
        searchWords.every((word) =>
          producto.vnombre.toLowerCase().includes(word)
        )
      );
    }

    if (filters.precioMinimo !== 0 || filters.precioMaximo !== 0) {
      productosFiltrados = productosFiltrados.filter(
        (producto) =>
          producto.fpreciooferta >= filters.precioMinimo &&
          producto.fpreciooferta <= filters.precioMaximo
      );
    }

    if (filters.marca) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.id_marca === parseInt(filters.marca)
      );
    }

    if (filters.categoria) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.idcategoria === parseInt(filters.categoria)
      );
    }

    if (filters.orden === 'mayor_precio') {
      productosFiltrados.sort((a, b) => b.fpreciooferta - a.fpreciooferta); 
    } else if (filters.orden === 'menor_precio') {
      productosFiltrados.sort((a, b) => a.fpreciooferta - b.fpreciooferta); 
    }

    if (filters.disponibilidad === 'disponible') {
      productosFiltrados = productosFiltrados.filter((producto) => producto.ncantidad >= 10);
    } else if (filters.disponibilidad === 'stock_bajo') {
      productosFiltrados = productosFiltrados.filter((producto) => producto.ncantidad >= 1 && producto.ncantidad <= 9);
    } else if (filters.disponibilidad === 'sin_stock') {
      productosFiltrados = productosFiltrados.filter((producto) => producto.ncantidad === 0);
    }

    setFilteredProducts(productosFiltrados);
  }, [productData, filters]);

  return (
    <>
     <Layout>
        <Sider width="25%" style={siderStyle}>
          <Filtro onFilterChange={handleFilterChange} />
        </Sider>
        <Content style={contentStyle}> <ContainerCard>
        {filteredProducts.filter((producto) => producto.bhabilitado === 1).map((producto, index) => (
          <Product
            key={`product-card-${producto.id_producto}`}
            {...producto}
          />
        ))}
      </ContainerCard></Content>
      </Layout>
     
    </>
  );
};

export default ProductList;
