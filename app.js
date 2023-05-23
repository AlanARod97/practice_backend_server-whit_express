import express from 'express';
import handlebars from "express-handlebars";
import apiCarts from './src/routes/carts.router.js';
import apiProds from './src/routes/products.router.js';

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', apiProds)
app.use('/api/carts', apiCarts)


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

export const server = app.listen(PORT , (req, res) => {
    console.log(`Listening PORT  ${PORT}`);
})
