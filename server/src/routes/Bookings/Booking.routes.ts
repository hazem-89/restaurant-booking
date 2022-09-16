import express, { Request, Response, Router } from 'express';
import BookingModels from '../../models/BookingModels'
import Day from '../../models/day'
import tableModels from '../../models/table'
const bookingRouter = Router();



//  new booking
bookingRouter.post('/bookings', async (req: Request, res: Response) => {
  Day.find({ date: req.body.date }, (err: any, days: string | any[]) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.tables.forEach(table => {
          if (table._id == req.body.table) {
            // The correct table is table
            table.reservation = new BookingModels({
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email
            });
            table.isAvailable = false;
            day.save((err: any) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Reserved");
                res.status(200).send("Added Reservation");
              }
            });
          }
        });
      } else {
        console.log("Day not found");
      }
    }
  });
})





export default bookingRouter