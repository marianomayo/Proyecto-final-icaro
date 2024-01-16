import React, { useEffect, useState } from 'react';
import '../Filtro/css/Filtro.css';
import { useProduct } from '../../hooks/useProduct';
import { useMarca } from '../../hooks/useMarca';
import { useCategory } from '../../hooks/useCategoria';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Select, Input } from 'antd';
const { Option } = Select;

const Filtro = ({ onFilterChange }) => {

  const {maxAndMinPrice} = useProduct();
  const {marcas} = useMarca();
  const {categorias} = useCategory();

  const [filtros, setFiltros] = useState({
    nombre: '',
    precioMinimo: 0,
    precioMaximo: 0,
    categoria: '',
    marca: '',
    orden: '',
    disponibilidad: '',
    oferta: ''
  });

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFiltros((prevFiltros) => ({ ...prevFiltros, [name]: value }));
  };

  const handleOrdenChange = (value) => {
    setFiltros((prevFiltros) => ({ ...prevFiltros, orden: value }));
  };

  const handleOferta = (value) => {
    setFiltros((prevFiltros) => ({ ...prevFiltros, oferta: value }));
  }

  const handlePrecioMinimoChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setFiltros((prevFiltros) => ({ ...prevFiltros, precioMinimo: value }));
  };

  const handlePrecioMaximoChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setFiltros((prevFiltros) => ({ ...prevFiltros, precioMaximo: value }));
  };

  const handleDisponibilidadChange = (value) => {
    setFiltros((prevFiltros) => ({ ...prevFiltros, disponibilidad: value }));
  };

  const aplicarFiltros = () => {
    if (filtros.precioMaximo < filtros.precioMinimo) {
      setFiltros((prevFiltros) => ({ ...prevFiltros, precioMaximo: filtros.precioMinimo }));
    }
    console.log('Filtros Aplicados', filtros)
    onFilterChange(filtros);
  };

  
  const limpiarFiltro = () => {
    setFiltros({
      nombre: '',
      precioMinimo: 0,
      precioMaximo: 0,
      categoria: '',
      marca: '',
      orden: '',
      disponibilidad: '',
      oferta: ''
    })
    onFilterChange({
      nombre: '',
      precioMinimo: 0,
      precioMaximo: 0,
      categoria: '',
      marca: '',
      orden: '',
      disponibilidad: '',
      oferta: ''
    });
  }

  // useEffect(() => {
   
  //   onFilterChange(filtros);
  // }, [ onFilterChange]);

  return (
    <div className='filtro'>            
        <label>         
        Nombre:  <Input name="nombre" style={{width: '150px'}}  value={filtros.nombre} onChange={handleInputChange}></Input>
        </label>
        <label>
        Precio Minimo:${filtros.precioMinimo}<input  type="range" style={{width: '180px'}} name="precioMinimo" min={maxAndMinPrice.precio_minimo} max={maxAndMinPrice.precio_maximo}
          value={filtros.precioMinimo}
          onChange={handlePrecioMinimoChange} /> 
        </label>     
        <label>
        Precio Maximo: ${filtros.precioMaximo}<input type="range"  style={{width: '180px'}} name="precioMaximo" min={filtros.precioMinimo} max={maxAndMinPrice.precio_maximo}
          value={filtros.precioMaximo}
          onChange={handlePrecioMaximoChange}/>
        </label>
        <label>Categoria:
        <Select
          value={filtros.categoria}
          style={{ width: 150 }}
          onChange={value => handleInputChange({ target: { name: 'categoria', value } })}
        >
          <Option value="">Selecciona una categoría</Option>
          {categorias.map(categoria => (
            <Option key={categoria.idcategoria} value={categoria.idcategoria}>
              {categoria.vcategoria}
            </Option>
          ))}
        </Select>          
        </label>
        <label>Marca:
        <Select
          value={filtros.marca}
          style={{ width: 150 }}
          onChange={value => handleInputChange({ target: { name: 'marca', value } })}
        >
          <Option value="">Selecciona una marca</Option>
          {marcas.map(marca => (
            <Option key={marca.id_marca} value={marca.id_marca}>
              {marca.vmarca}
            </Option>
          ))}
        </Select>
        </label>
         <label>
        Ordenar por:
        <Select
          value={filtros.orden}
          style={{ width: 150 }}
          onChange={handleOrdenChange}
        >
          <Option value="">Selecciona orden</Option>
          <Option value="menor_precio">Menor Precio</Option>
          <Option value="mayor_precio">Mayor Precio</Option>
        </Select>        
      </label>
      <label>
        Disponibilidad:
        <Select
          value={filtros.disponibilidad}
          style={{ width: 150 }}
          onChange={handleDisponibilidadChange}
        >
          <Option value="">Selecciona disponibilidad</Option>
          <Option value="disponible">Stock Disponible</Option>
          <Option value="stock_bajo">Stock Bajo</Option>
          <Option value="sin_stock">S/Stock</Option>
        </Select>
      </label>
      <label>
        Oferta:
        <Select
          value={filtros.oferta}
          style={{ width: 150 }}
          onChange={handleOferta}
        >
          <Option value="">Selecciona disponibilidad</Option>
          <Option value="oferta_si">Si</Option>
          <Option value="oferta_no">No</Option>
        </Select>
      </label>
        <div className='btn-filtros-container'>
      
          <Button style={{ marginRight: '10px' }} icon={<SearchOutlined />}  onClick={aplicarFiltros}>Filtrar</Button>    
          <Button style={{ marginRight: '10px' }}  onClick={limpiarFiltro}>Limpiar</Button>   
        </div>
    </div>
  );
}

export default Filtro;