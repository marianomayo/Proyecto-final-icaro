const PedidoModel = require('../Model/PedidoModel');
const OrdenCompraModel = require('../Model/OrdenCompraModel');


const getAll = async (req, res) => {
    try {
        const pedidos = await PedidoModel.getAll();

        res.status(200).json({ msg: `Se han encontrado ${pedidos.length} pedidos`, data: pedidos, success: true });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}

const generarPedido = async (req, res) => {
    try {
        
        const vObj = req.body;        
        
        await OrdenCompraModel.updateOrder(vObj.id_orden_compra);
        
        const pedido = await PedidoModel.generarPedido(vObj);
        
     
        res.status(200).json({ msg: `Se han generado el pedido numero ${pedido}`, data: pedido, success: true });
     
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}





module.exports = { getAll, generarPedido };