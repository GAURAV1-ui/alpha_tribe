import express  from "express";
import connectDB from "./db/index.js";

import dotenv from 'dotenv';
import path from 'path';

import userRoutes from "./routes/userRoutes.js";

dotenv.config({path: path.join('.env')});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);

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