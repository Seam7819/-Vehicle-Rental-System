import express from "express";
import dotenv from "dotenv";

// import authRoutes from "./modules/auth/auth.routes";
// import vehicleRoutes from "./modules/vehicles/vehicle.routes";
// import userRoutes from "./modules/users/user.routes";
// import bookingRoutes from "./modules/bookings/booking.routes";

dotenv.config();
const app = express();

app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/vehicles", vehicleRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/bookings", bookingRoutes);

export default app;
