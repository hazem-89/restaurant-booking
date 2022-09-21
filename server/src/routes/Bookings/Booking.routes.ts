import express, { Request, Response, Router } from 'express';
import BookingModels from '../../models/BookingModels'
import { BookingInterface } from '../../interface'
import { Document, Types } from 'mongoose';
import AdminModels from '../../models/AdminModels'

const bookingRouter = Router();


bookingRouter.get('/bookings', async (req: Request, res: Response) => {
  const allBookings = BookingModels.find((err: any, bookings: any) => {
    console.log(bookings);
    if (err) {
      res.send("Error!");
    } else {
      res.send(bookings);
    }
  })
  // console.log(typeof allBookings, allBookings);

  // res.status(200).send(allBookings)
})

//  new booking
bookingRouter.post('/newBooking', async (req: Request, res: Response) => {

  const newBooking = new BookingModels(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).send(savedBooking)
  } catch (err) {
    res.status(500).json(err)
    console.log('err');

  }

})





export default bookingRouter