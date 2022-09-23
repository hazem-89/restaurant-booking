import express, { NextFunction, Request, Response, Router } from 'express';
import BookingModels from '../../models/BookingModels'
import TableModels from '../../models/TableModles'
import { Document, Types } from 'mongoose';
const availabilityRouter = Router();


availabilityRouter.post('/availability', async (req: Request, res: Response, next: NextFunction) => {
  let date = req.body.date
  if (date) {
    const allBookings = await BookingModels.find({ date: req.body.date })
    const allBookings1 = allBookings.map((booking) => ({ tableId: booking.tableId, bookedTime: booking.time }))
    // console.log(allBookings);

    const allTables = await TableModels.find()


    const availableTables = allTables.reduce((prev: any[], current) => {
      const isAvailableAt18 = !allBookings1.find((booking) => booking.bookedTime === "18:00" && booking.tableId === current.id)
      const isAvailableAt21 = !allBookings1.find((booking) => booking.bookedTime === "21:00" && booking.tableId === current.id)
      if (isAvailableAt18 || isAvailableAt21) {
        prev.push({ tableId: current.id, tableName: current.name })

        prev[prev.length - 1].isAvailableAt18 = isAvailableAt18
        prev[prev.length - 1].isAvailableAt21 = isAvailableAt21

      }
      return prev
    }, [])
    res.status(200).send({ availableTables })
    console.log(req.body.date);
  } else {
    console.log('no req.body.date');
  }

})


export default availabilityRouter