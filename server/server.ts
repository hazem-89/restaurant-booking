import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';



const app = express();
const port = 4000;
// Global middlewares
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