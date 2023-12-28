const { Router } = require('express');
const CategoriaRouter = require('../Controller/CategoriaController');
const router = Router();


router.get("/", CategoriaRouter.getCategorias);



module.exports = router;
