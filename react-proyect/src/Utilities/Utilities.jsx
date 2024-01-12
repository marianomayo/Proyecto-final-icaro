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