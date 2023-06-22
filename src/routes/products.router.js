import express from 'express';
import { productService } from '../services/products.service.js';

export const  productsRouter = express.Router();

productsRouter.get("/", async(req, res)=>{
    try{
        const queryParams = req.query;
        const products = await productService.getAll(queryParams)
        res.status(200).json(products)
    }catch (e){
        console.log(e)
        return res.status(500).json({
            status: "error",
            msg: "algo salio mal",
            payload: {},
        })
    }

    
})

