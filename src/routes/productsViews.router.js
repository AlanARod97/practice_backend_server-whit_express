import express from 'express';
import { ProductService } from '../services/products.service.js';

export const productsViews = express.Router();


productsViews.get("/", async(req,res)=>{
    try{
        const{limit, pagina,category, order}= req.query;
        const data = await ProductService.getAllPagination(
            limit,
            pagina,
            category,
            order,
        )

        const {totalPages, page, hasPrevPage, hasNextPage, prevPage,nextPage} = data
        const simpleProduct = data.docs.map((doc)=>doc.toObject());
        const title = "Listado de Productos";
        return res.status(200).render("products", {
            title,
            simpleProduct,
            totalPages,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        })
    }catch(e){
        res
        .status(501)
        .send({ status: "error", msg: "Error en el servidor", error: e });
    }
    
})