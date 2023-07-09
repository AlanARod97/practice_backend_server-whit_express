import express from 'express';
import { userService } from '../services/users.service.js';


export const loginRouter = express.Router()


loginRouter.get("/", async(req,res)=>{
    try{
        return res.status(200).render("login")
    }catch(err){
        return res.status(501).json({status: "error", msg:"error en el servidor", error: err})
    }
});


loginRouter.post("/", async(req,res)=>{
    const{ email, password} = req.body
    const userCheck = await userService.findUser(email, password)

    if(userCheck){
        req.session.email = userCheck.email;
        req.session.rol = userCheck.rol;

        res.status(200).redirect("/api/products")
    }else{
        res.status(501).send("Email o contraseña incorrecta")
    }

})



