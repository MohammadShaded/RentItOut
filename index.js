import express from "express";
const app = express();
import itemRouters from "./routes/item.js";

const PORT = 5000;
app.use(express.json());
app.use("/items", itemRouters);
app.listen(PORT, () => console.log(`the app is listening on port ${PORT}`));
