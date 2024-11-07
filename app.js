import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/db.js"; // Ensure db.js is loaded after dotenv.config()
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import itemRouters from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRouters from "./routes/categoryRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
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

const app = express();
app.use(express.json());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));
//note for the team: under here you have to add your routes usings
app.use("/users", userRoutes);
app.use("/items", itemRouters);
app.use('/rentals', rentalRoutes);
app.use("/categories", categoryRouters);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
