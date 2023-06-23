//@ts-check

import express from 'express';
import { cartService } from '../services/cart.service.js';

export const cartViewsRouter = express.Router();


cartViewsRouter.get("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.getById(cartId);
      console.log(cart);
      const simpleCart= cart.products.map((doc) => doc.toObject());
      console.log(simpleCart);
      res.status(200).render("carts", { simpleCart});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });