const PedidoModel = require('../Model/PedidoModel');
const OrdenCompraModel = require('../Model/OrdenCompraModel');
const ViewPedidoModel = require('../Model/ViewPedidosModel');
const ViewOrdenCompraxArticulo = require('../Model/ViewOrdenCompraPorArticulo');

const getAll = async (req, res) => {
    try {
        const pedidos = await ViewPedidoModel.getPedidos();

        res.status(200).json({ msg: `Se han encontrado ${pedidos.length} pedidos`, data: pedidos, success: true });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}

const getPedidosSinProcesar = async (req, res) => {
    try {
        const pedidos = await ViewPedidoModel.getPedidosSinProcesar();

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

const procesarPedido = async (req, res) => {
    try {
        
        const idParams = Number(req.params.id);       
        
        const pedido = await PedidoModel.procesarPedido(idParams);
        
     
        res.status(200).json({ msg: `Se ha procesado el pedido numero ${idParams}`, success: true });
     
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}

const getArticulosOrden = async (req, res) => {
    try {
        
        const idParams = Number(req.params.id);       
        
        const articulos = await ViewOrdenCompraxArticulo.getArticulosOrden(idParams);
        
     
        res.status(200).json({ data: articulos, success: true });
     
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}

module.exports = { getAll, generarPedido, getPedidosSinProcesar, procesarPedido, getArticulosOrden };