import express from 'express';
import { userService } from '../services/users.service.js';
import { createHash } from '../utils/bcrypt.js';

export const registerRouter = express.Router()


registerRouter.get("/", async (req,res)=>{
    try{
        return res.status(200).render("register")
    }catch(err){
        res.
        status(501).
        send({status:"error", msg: "error en el servidor", error: err})
    }
});


registerRouter.post("/", async (req, res)=>{
    const {email, username, password,rol} = req.body;
    const userExist = await userService.findUserByEmail(email)
    if(userExist){
        res.send("El usuario ya existe!")
    }else{
        userService.create(email, username, createHash(password),rol)
        res.redirect("/");
    }
})



