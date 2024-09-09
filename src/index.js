import express  from "express";
import connectDB from "./db/index.js";

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join('.env')});

const app = express();

connectDB()
.then(()=> {
    app.on("error", (error) => {
        console.log("Err",error);
        throw error
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is listening to Port: ${process.env.PORT}`)
    })
}).catch((err)=> {
        console.log("Mongo Db connection failed", err);
})