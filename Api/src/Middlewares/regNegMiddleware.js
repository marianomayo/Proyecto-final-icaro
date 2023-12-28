const productModel = require('../Model/ProductModel');

const checkCantidadesProducto = async (req, res, next) => {

    const {id_producto, ncantidad} = req.body;
    
    const product = await productModel.getProductById(id_producto);
    const cantidades = product[0].ncantidad;

    if ( (cantidades - ncantidad )  >= 0) { 
        next();
    } else {
        res.status(401).json({ message: 'No hay cantidades suficientes para añadir a la orden', success: false });
    }
};

module.exports = {checkCantidadesProducto};