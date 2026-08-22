import express from "express";
import morgan from "morgan";
import { conectarDB } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

conectarDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api",userRoutes);
app.use("/api", taskRoutes);

app.listen(PORT , () => console.log("servidor corriendo"));
