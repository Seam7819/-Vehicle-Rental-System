import { Request, Response } from 'express';
import * as BookingService from './booking.service';

export const create = async (req: Request, res: Response) => {
  const booking = await BookingService.createBooking(
    req.body,
    req.user
  );
  res.status(201).json(booking);
};

export const getAll = async (req: Request, res: Response) => {
  const bookings = await BookingService.getBookings(req.user);
  res.json(bookings);
};

export const updateStatus = async (req: Request, res: Response) => {
  await BookingService.updateBookingStatus(
    Number(req.params.bookingId),
    req.user
  );
  res.json({ message: 'Booking updated successfully' });
};
