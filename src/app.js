import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from "express-handlebars";
import session from 'express-session';
import FileStore from 'session-file-store';
import { __dirname } from './config.js';
import { cartViewsRouter } from './routes/cartViews.router.js';
import { cartRouter } from './routes/carts.router.js';
import { productsRouter } from './routes/products.router.js';
import { productsViews } from './routes/productsViews.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { usersRouter } from './routes/users.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';
import { iniPassport } from './config/passport.config.js';
import passport from 'passport';


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
      mongoUrl:"mongodb+srv://rodriguezalanandres:IvN4KD6Shwqb1miH@backendcoder.l9fmynx.mongodb.net/",
      mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
      ttl:15
    }),
    secret: "ekfvkfvm",
    resave:false,
    saveUninitialized: false
}))

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)



app.use("/test-chat", testChatRouter)
app.use("/products-views", productsViews)
app.use("/cart-views", cartViewsRouter)









app.get('/', (_, res) => {
  return res.status(404).render("home");
});











  
 


