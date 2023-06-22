import express from 'express';
import { userService } from '../services/users.service.js';


export const  usersRouter = express.Router();

usersRouter.get("/", async(req, res)=>{
    try{
      const users = await userService.getAll();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        payload: users,

    }
    );
    }catch (e){
        console.log(e)
        return res.status(500).json({
            status: "error",
            msg: "algo salio mal",
            payload: {},
        })
    }
})


usersRouter.post("/", async (req, res) => {
    
    try {
      const { firstName, lastName, email } = req.body;
      if (!firstName || !lastName || !email) {
        console.log(
          "validation error: please complete firstName, lastname and email."
        );
        return res.status(400).json({
          status: "error",
          msg: "please complete firstName, lastname and email.",
          payload: {},
        });
      }
      const userCreated = await userService.create({ firstName, lastName, email });
      return res.status(201).json({
        status: "success",
        msg: "user created",
        payload: {
          _id: userCreated._id,
          firstName: userCreated.firstName,
          lastName: userCreated.lastName,
          email: userCreated.email,
        }
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "algo salio mal :(",
        payload: {},
      });
    }
  });
  

  usersRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
      if (!firstName || !lastName || !email || !id) {
        console.log(
          "validation error: please complete firstName, lastname and email."
        );
        return res.status(400).json({
          status: "error",
          msg: "please complete firstName, lastname and email.",
          payload: {},
        });
      }
      try{
        const userUptaded = await userService.updateOne(
          { _id: id ,
          firstName, 
          lastName, 
          email }
        );
        if(userUptaded.matchedCount >0){
          return res.status(201).json({
            status: "success",
            msg: "user uptaded",
            payload: {},
          });
        }else{
          return res.status(404).json({
            status: "error",
            msg:"user not found",
            payload: {},
          })
        }
      }catch(e){
        return res.status(500).json({
          status: "error",
          msg:"db server error while updating user",
          payload: {},
        })

      }
     
      
      
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  });
  

  usersRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteOne({ _id: id });
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        payload: {},
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  });
  