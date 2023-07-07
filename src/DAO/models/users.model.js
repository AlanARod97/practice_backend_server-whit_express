import { Schema, model } from "mongoose";


export const userModel = model(
    "users",
    new Schema({
        email: {type: String, required: true, max: 100},
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        rol: {type: String, required: true, max: 100},
    
    })


); 