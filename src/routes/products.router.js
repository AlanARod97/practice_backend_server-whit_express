
import express from 'express';
import { ProductService } from '../services/products.service.js';

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
    try {
        const { limit, pagina, category, order } = req.query;
        const data = await ProductService.getAllPagination(
            limit,
            pagina,
            category,
            order
        );
        const {
            totalDocs,
            totalPages,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = data;
        return res.status(200).json({
            status: "success",
            msg: `Mostrando los ${data.docs.length} productos`,
            payload: data.docs,
            totalDocs: totalDocs,
            totalPages: totalPages,
            prevPage: hasPrevPage ? prevPage : null,
            nextPage: hasNextPage ? nextPage : null,
            page: page,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: hasPrevPage
                ? `/api/products?limit=${data.limit}&pagina=${prevPage}`
                : null,
            nextLink: hasNextPage
                ? `/api/products?limit=${data.limit}&pagina=${nextPage}`
                : null,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "Error en el servidor",
            payload: {},
        });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        const { title, description, category, price, thumbnail, code, stock } = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(400).json({
                status: "error",
                msg: "complete todos los campos requeridos",
                payload: {},
            })

        }

        const productCreate = await ProductService.createProduct({
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock,
        });

        return res.status(201).json({
            status: "success",
            msg: "Producto creado",
            payload: {
                _id: productCreate._id,
                title: productCreate.title,
                description: productCreate.description,
                category: productCreate.category,
                price: productCreate.price,
                thumbnail: productCreate.thumbnail,
                code: productCreate.code,
                stock: productCreate.stock,
            }
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "Error en el servidor",
          payload: {},
    })}
})


productsRouter.put("/:_id", async(req,res)=>{
    try{
        const {_id} = req.params;
        const {title, description, price, thumbnail, code, stock} = req.body;
        if(!title ||
            !description ||
            !price ||
            !thumbnail ||
            !code ||
            !stock ||
            !_id){
                return res.status(400).json({
                    status: "error",
                    msg: "complete todos los campor",
                    payload: {},

                })
            }
            try{
                const productUpdated = await ProductService.updateProduct({
                    _id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                })

                if(productUpdated.matchedCount >0){
                    return res.status.json({
                        status:"success",
                        msg: "producto actualizado",
                        payload: `Producto: ${_id} actualizado`,
                    })
                }else{
                    return res.status(404).json({
                        status:"error",
                        msg:"producto no encontrado",
                        payload:{},
                    })
                }
            }catch(e){
                return res.status(500).json({
                    status: "error",
                    msg: "Error al actualizar el producto",
                    payload: {},
                  });



            }

    }catch(e){
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "Error en el servidor",
          payload: {},
    })}
})

productsRouter.delete("/:_id", async(req,res)=>{
    try{
        const{_id} = req.params;

        const deleted = await ProductService.deleteProduct(_id);
        return res.status(200).json({
            status: "succes",
            msg: `Producto: ${_id} eliminado`,
        })
    }catch(e){
        return res.status(500).json({
            status: "error",
            msg: "Error en el servidor",
            payload: {},
          });
        
    }
})









