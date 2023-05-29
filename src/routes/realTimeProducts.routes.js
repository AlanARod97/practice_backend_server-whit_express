import express from "express"
import ProductManager from "../productManager"


export const RealTimeRouter = express.Router()

const productManager = new ProductManager('../db/products.json')

RealTimeRouter.get('/', (req,res)=>{
    try{
        let allProducts = productManager.getProducts()

        return res
        .status(200)
        .render("realTimeProducts", {} )
        
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error" })
    }
    
})

