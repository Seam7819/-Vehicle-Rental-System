import * as BookingService from "./booking.service";

export const createBooking = async (req, res) => {
  const booking = await BookingService.createBooking(req.body, req.user.id);
  res.status(201).json({ success: true, message: "Booking created", data: booking });
};

export const getBookings = async (req, res) => {
  const bookings = await BookingService.getBookings(req.user);
  res.json({ success: true, data: bookings });
};

export const cancelBooking = async (req, res) => {
  const booking = await BookingService.cancelBooking(req.params.bookingId);
  res.json({ success: true, message: "Booking cancelled", data: booking });
};

export const returnBooking = async (req, res) => {
  const booking = await BookingService.returnBooking(req.params.bookingId);
  res.json({ success: true, message: "Vehicle returned", data: booking });
};
