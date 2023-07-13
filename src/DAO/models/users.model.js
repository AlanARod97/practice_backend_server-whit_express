import { Schema, model } from "mongoose";


export const userModel = model(
    "users",
    new Schema({
        firstName: { type: String, required: false, max: 100 },
        lastName: { type: String, required: false, max: 100 },
        age: { type: Number, required: false },
        email: { type: String, required: true, max: 100, unique: true },
        password: { type: String, required: false, max: 100 },
        rol: { type: String, default: "user" },
    
    })


); 