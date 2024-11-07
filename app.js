import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/db.js"; // Ensure db.js is loaded after dotenv.config()

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import passport from './config/passportConfig.js';
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "API documentation for RentItOut",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);


import insuranceRoutes from "./routes/insuranceRoutes.js";
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import itemRouters from './routes/itemRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'
import categoryRouters from './routes/categoryRoutes.js'

//note for the team: under here you have to add your routes usings
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/items", itemRouters);
app.use('/rentals', rentalRoutes);
app.use("/categories", categoryRouters);
app.use('/payments', paymentRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/admin', adminRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
