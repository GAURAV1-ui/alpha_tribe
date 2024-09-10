import express  from "express";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./db/index.js";
import cookiesParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiSetup } from './utils/swagger.js';

//routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";

dotenv.config({path: path.join('.env')});

//server
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST","PUT","DELETE"]
    }
});

//middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUiSetup);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.use(cors());

//socket io connection
io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
    })
});

app.use((req, res, next) => {
    req.io = io;
    next();
})


//routes
app.use("/api", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/posts", likeRoutes);


//connect to db
connectDB()
.then(()=> {
    server.on("error", (error) => {
        console.log("Err",error);
        throw error
    })
    server.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is listening to Port: ${process.env.PORT}`)
    })
}).catch((err)=> {
        console.log("Mongo Db connection failed", err);
})