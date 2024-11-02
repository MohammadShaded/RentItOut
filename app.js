import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/db.js"; // Ensure db.js is loaded after dotenv.config()

import itemRouters from "./routes/item.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRouters from "./routes/categoryRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";

const app = express();
app.use(express.json());

//note for the team: under here you have to add your routes usings
app.use("/users", userRoutes);
app.use("/items", itemRouters);
app.use('/rentals', rentalRoutes);
app.use("/categories", categoryRouters);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
