import express from 'express';
import handlebars from "express-handlebars";
import apiCarts from './src/routes/carts.router.js';
import apiProds from './src/routes/products.router.js';
import { homeRouter } from './src/routes/home.routes.js';
import { __dirname } from './utils.js';

import { Server } from "socket.io";


const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', apiProds)
app.use('/api/carts', apiCarts)
app.use("/home",homeRouter)

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


socketServer.on('connection',(socket)=>{
  socket.on('msg_front_back',(allProd)=>{
      socketServer.emit('msg_back_front', allProd)
  })
  
})



const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
  });
  
  const socketServer = new Server(httpServer);

export const server = app.listen(PORT , (req, res) => {
    console.log(`Listening PORT  ${PORT}`);
})
