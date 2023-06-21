import express from 'express';
import handlebars from "express-handlebars";
import { __dirname } from './config.js';
import { usersRouter } from './routes/users.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';
import {testChatRouter} from './routes/test-chat.router.js';


const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening http://localhost:${PORT}`);
});



connectSocketServer(httpServer);
connectMongo();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// app.use('/api/products', apiProds)
// app.use('/api/carts', apiCarts)
// app.use("/home",homeRouter)
 app.use("/test-chat", testChatRouter)
app.use("/api/users", usersRouter)

















app.get('/', (_, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    payload: {},
  });
});











  
 

