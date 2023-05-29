import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();
const productManager = new ProductManager('../db/products.json');

// GET /api/products

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : undefined
        const products = await productManager.getProducts(limit);
        return res
            .status(200)
            .json({ status: 'success', msg: "All products", data: products })
    } catch (err) {
        return res.status(404).json({ status: "error", msg: "Not Found", data: {} })
    }
});


// GET /api/products/:id

router.get("/:pid", async (req, res)=>{
    const product = await productManager.getProductsById(Number(req.params.pid));
    if(!product){
        res.status(404).json({status: "error", msg: "Not Found"})
    }else{
        res.status(200).json({status:"success", msg:`${product.title}`, data: product })
    }
} )

// POST /api/products
router.post("/", async (req, res)=>{
    const product = req.body
    productManager.addProduct(product)
    return res
    .status(201)
    .json({status:"success", msg:"Product added", data: product})

})

// PUT /api/products/:id

router.put("/:pid", async (req, res)=>{
    const id = Number(req.params.pid)
    const body = req.body
    const updatedProduct = await productManager.updateProduct(id, body);
    return res
    .status(200)
    .json({status:"success", msg: "Modified product", data: updatedProduct })
})

// DELETE /api/products/:id

router.delete("/:id", async (req,res)=>{
    const id = Number(req.params.id)
    const deletedProduct = await productManager.deleteProduct(id);
    if(!deletedProduct){
        return res
        .status(404)
        .json({status: "error", msg: "Product not found", data:{}})
    }else{
        return res
        .status(200)
        .json({status:"success", msg: "Removed product", data:{}})
    }
})

export default router;