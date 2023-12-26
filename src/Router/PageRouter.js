const { Router } = require('express');
const PageController = require('../Controller/PageController');
const router = Router();


router.get("/", PageController.home);

router.get("/home", PageController.home);

router.get("/signup", PageController.signup);

router.get("/login", PageController.login);

router.get("/carrito", PageController.cart);

router.get("/productDetail/:id", PageController.productDetail);

module.exports = router;
