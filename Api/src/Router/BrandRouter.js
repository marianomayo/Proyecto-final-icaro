const { Router } = require('express');
const BrandController = require('../Controller/BrandController');
const router = Router();


router.get("/getBrands", BrandController.getAll);



module.exports = router;
