import express from 'express';
import authRoutes from './modules/authentication/auth.routes';
import userRoutes from './modules/customers/customers.route';
import vehicleRoutes from './modules/vehicles/vehicle.route';
import bookingRoutes from './modules/bookings/booking.route';

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/bookings', bookingRoutes);

export default app;
