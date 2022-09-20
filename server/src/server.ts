import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import connectDB from './config/Db';
import bookingRouter from './routes/Bookings/Booking.routes'
import availabilityRouter from './routes/Availability/Availability.routes'

var bodyParser = require('body-parser');


const app = express();
const port = 4000;
const routes = Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes);
app.use(express.json());
app.use(
  session({
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false,
  })
);
routes.use('/api', bookingRouter)
routes.use('/api', availabilityRouter)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


app.use(cookieParser());

// Connect to database
connectDB();

// Start server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

