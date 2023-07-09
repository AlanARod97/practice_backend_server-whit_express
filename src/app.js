import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from "express-handlebars";
import { __dirname } from './config.js';
import { cartViewsRouter } from './routes/cartViews.router.js';
import { cartRouter } from './routes/carts.router.js';
import { loginRouter } from './routes/login.router.js';
import { logoutRouter } from './routes/logout.router.js';
import { productsRouter } from './routes/products.router.js';
import { productsViews } from './routes/productsViews.router.js';
import { registerRouter } from './routes/register.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { usersRouter } from './routes/users.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';
import  FileStore  from 'session-file-store';
import session from 'express-session';
import MongoStore from 'connect-mongo';


const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening http://localhost:${PORT}`);
});

const fileStorage = FileStore(session)



connectSocketServer(httpServer);
connectMongo();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))
app.use(cookieParser())

app.use(session({
    store:MongoStore.create({
      mongoUrl:"mongodb+srv://rodriguezalanandres:IvN4KD6Shwqb1miH@backendcoder.l9fmynx.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
      ttl:15
    }),
    secret: "ekfvkfvm",
    resave:false,
    saveUninitialized: false
}))

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("/api/session/login", loginRouter)
app.use("/api/session/logout", logoutRouter)
app.use("/api/session/register", registerRouter)


app.use("/test-chat", testChatRouter)
app.use("/products-views", productsViews)
app.use("/cart-views", cartViewsRouter)









app.get('/', (_, res) => {
  return res.status(404).render("home");
});











  
 


