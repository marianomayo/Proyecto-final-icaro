const express = require("express");

const session = require('express-session');

const PORT = 3000;

const db = require("./db");

const ProductRouter = require("./Router/ProductRouter");

const BrandRouter = require("./Router/BrandRouter");

const PageRouter = require("./Router/PageRouter");

const UserRouter = require("./Router/UserRouter");

const OrderRouter = require("./Router/OrderRouter");

const CategoryRouter = require("./Router/CategoryRouter");

const PedidoRouter = require("./Router/PedidoRouter");

const middlewareDePrueba = (req, res, next) => {
  console.log("Llego una petición al servidor");
  next();
};

const app = express();

app.use(
  session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false,
    rolling: true, 
    cookie: {
      maxAge: 60 * 60 * 1000, 
    },
  })
);

app.use(express.json());

app.use(middlewareDePrueba);


app.use("/", PageRouter); 

app.use("/order", OrderRouter); 

app.use("/brand", BrandRouter);

app.use("/category", CategoryRouter);

app.use("/user", UserRouter);

app.use("/product", ProductRouter);

app.use("/pedido", PedidoRouter);

app.listen(PORT, () => {
  db.authenticate().then(() => console.log("Conectado a la base de datos!"));
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});