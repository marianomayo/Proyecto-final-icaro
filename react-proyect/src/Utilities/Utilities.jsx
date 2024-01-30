import { Modal } from 'antd';
export const cortarTexto = (texto, longitud) => {
    return texto.length > longitud ? `${texto.slice(0, longitud)}...` : texto;
};

export const mostrarPrecio = (precioOriginal, precioOferta, enOferta) => {
    if (enOferta) {
      return {
        precioMostrado: (
          <>
            <p className="precio-tachado">${precioOriginal.toFixed(2)}</p>         
            <p className="precio-oferta">Oferta: ${precioOferta.toFixed(2)}</p>
          </>
        ),
      };
    } else {
      return {
        precioMostrado: `$${precioOriginal.toFixed(2)}`,
      };
    }
};

export const modificarEstiloElemento = (bofertavalida) => {
    const cardClass = !bofertavalida ? 'product-card without-offer' : 'product-card';
    const empujar = !bofertavalida ? 'empujar' : ''

    return {
      cardClass,
      empujar
    }
}

export const disponibilidadStock = (ncantidad) => {
  let statusText;
  let statusColor;
  
  if (ncantidad >= 10) {
    statusText = "Disponible";
    statusColor = "green";
  } else if (ncantidad >= 1 && ncantidad <= 9) {
    statusText = "Stock Bajo";
    statusColor = "orange";
  } else {
    statusText = "S/Stock";
    statusColor = "red";
  }

  return (
    <span style={{ color: statusColor }}>
      {statusText}
    </span>
  );
}


export const errorModal = (error) => {
  
  Modal.error({
    title: '',
    content: error,
  });
}

export const confirmMessage = (msg) => {
  const modal = Modal.success({
    content: msg,
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return modal; 
};