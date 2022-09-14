import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';




const app = express();
const port = 4000;
const routes = Router();

app.use(express.json());
app.use(
  session({
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false,
  })
);


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());


app.listen(port, () => {
  console.log(`server is running on ${port}`);
});