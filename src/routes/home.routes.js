import express from "express"
import ProductManager from "../productManager"


export const homeRouter = express.Router()

const productManager = new ProductManager('../db/products.json')

homeRouter.get('/', (req,res)=>{
    try{
        let allProducts = productManager.getProducts()

        return res
        .status(200)
        .render('home', allProducts)
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error" })
    }
    
})