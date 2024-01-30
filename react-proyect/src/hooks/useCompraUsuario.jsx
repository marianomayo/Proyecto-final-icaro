import { useEffect, useState } from 'react';
import axios from 'axios';

const useCompraUser = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const realizarPing = async () => {
      try {
        
        const response = await axios.get('/Api/pedido/obtenerPedidosPorUsuario'); 
        
     
        setCompras(response.data);
      } catch (error) {
        console.error('Error al realizar el ping:', error);
      }
    };

 
    realizarPing();

    
    const intervalId = setInterval(realizarPing, 60000);


    return () => clearInterval(intervalId);
  }, []);

  return compras;
};

export default useCompraUser;
