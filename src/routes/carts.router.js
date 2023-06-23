import express from 'express';
import { cartService } from '../services/cart.service.js';

export const cartRouter = express.Router();


cartRouter.get("/", async (req, res) => {
    try {
      const cart = await cartService.getAll();
      res.status(200).json({
        status: "success",
        msg:"carrito",
        payload: cart,
      });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  });

  cartRouter.get("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.getById(cartId);
      res.status(200).json({
        status: "success",
        msg: `Producto: ${cartId}`,
        payload: cart,
      });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  });

  cartRouter.post("/", async (req, res) => {
    try {
      const { products } = req.body;
      const newCart = await cartService.createOne({ products });
      res.status(200).json({
        status: "success",
        payload: newCart,
      });
    } catch (e) {
     
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  cartRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProductToCart(cid, pid);
      res.status(200).json({
        status: "success",
        payload: cart,
      });
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  });


  cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.removeProduct(cid, pid);
      res
        .status(200)
        .json({ status: "success", message: "Product removed from cart", cart });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  cartRouter.delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      await cartService.clearCart(cid);
      res
        .status(200)
        .json({ status: "success", message: "Cart cleared successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  cartRouter.put("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const cart = await cartService.updateCart(cid, products);
      res
        .status(200)
        .json({ status: "success", message: "Cart updated successfully", cart });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  cartRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductQuantity(cid, pid, quantity);
      res
        .status(200)
        .json({ status: "success", message: "Product quantity updated", cart });
    } catch (error) {
      console.error(e);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });