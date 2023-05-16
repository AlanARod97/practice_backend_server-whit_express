import express from 'express';
import { CartManager } from '../cartManager.js';

const router = express.Router();
const cartManager = new CartManager('./db/carts.json');


// POST /api/carts/
router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    return res
    .status(201)
    .json({status:"Success", msg:"Added to cart", data: newCart} );
  });
  
  // GET /api/carts/:cid
  router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res
      .status(404)
      .json({ status: "error", msg:"Not found", data:{} });
    } else {
      return res
      .status(200)
      .json({status: "success", msg:"Cart", data: cart});
    }
  });
  
  // POST /api/carts/:cid/product/:pid
  router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body || 1;
  
    try {
      const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
      res.json(updatedCart);
    } catch (error) {
      return res
      .status(400)
      .json({status:"error", msg:"Modified product", data: updatedCart});
    }
  });
  
  export default router;