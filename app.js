import express from "express";
import morgan from "morgan";
import { conectarDB } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";
import "./src/models/relaciones.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", profileRoutes);
app.use("/api", tagRoutes);

const iniciarServidor = async () => {
	try {
		await conectarDB();
		app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
	} catch (error) {
		console.error("No se pudo iniciar el servidor:", error.message);
	}
};

iniciarServidor();
