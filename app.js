import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/db.js"; // Ensure db.js is loaded after dotenv.config()

import itemRouters from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRouters from "./routes/categoryRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
<<<<<<< HEAD
import paymentRoutes from './routes/paymentRoutes.js';
=======
import insuranceRoutes from "./routes/insuranceRoutes.js";
>>>>>>> 79e0643af42d398271c734957c73c3be1aa20988
const app = express();
app.use(express.json());

//note for the team: under here you have to add your routes usings
app.use("/users", userRoutes);
app.use("/items", itemRouters);
app.use('/rentals', rentalRoutes);
app.use("/categories", categoryRouters);
<<<<<<< HEAD
app.use('/payments', paymentRoutes);
=======
app.use('/insurance', insuranceRoutes);
>>>>>>> 79e0643af42d398271c734957c73c3be1aa20988

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
