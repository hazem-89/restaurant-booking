import express, { Request, Response, Router } from 'express';
import BookingModels from '../../models/BookingModels'
import { BookingInterface } from '../../interface'
import { Document, Types } from 'mongoose';
import { HttpError } from '../../middleware/errorMiddleware';

const bookingRouter = Router();

/** Get all booking*/
bookingRouter.get('/bookings', async (req: Request, res: Response) => {
  const allBookings = BookingModels.find((err: any, bookings: any) => {
    console.log(bookings);
    if (err) {
      res.send("Error!");
      console.log(err);

    } else {
      res.status(200).send(bookings);
    }
  })

})

/** Create new booking */
bookingRouter.post('/newBooking', async (req: Request, res: Response) => {

  const newBooking = new BookingModels(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      msg: 'Booking has sent',
      data: newBooking,
    });
  } catch (err) {

    res.status(500).json(err)
    console.log('err');

  }

})


/** update an existing booking*/
bookingRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await BookingModels.findById(id);
    if (!booking) {
      throw new HttpError(404, 'booking not found');
    }
    const updatedBooking = await BookingModels.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: 'Booking updated',
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json(err);
  }

})

/** Delete an existing booking*/
bookingRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const booking = await BookingModels.findById(req.params.id);
    if (!booking) {
      throw new HttpError(404, 'booking not found');
    }
    await booking?.deleteOne({ $set: req.body })
    res.status(200).json('Deleted booking with id: ' + req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
})
export default bookingRouter