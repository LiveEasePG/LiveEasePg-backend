import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  userRouter  from './api/routes/user.routes.js';


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:true}))
app.use(cookieParser())

app.use("/users", userRouter);

export {app}