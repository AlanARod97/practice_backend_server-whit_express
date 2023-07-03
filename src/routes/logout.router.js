import express from 'express';

export const logoutRouter = express.Router()

logoutRouter.get("/", (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send("Error al cerrar sesion")
        }

        res.redirect("/")
    })
});



