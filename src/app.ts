import express from "express";
import swaggerUi from "swagger-ui-express";

import userRoutes from "./routes/user.routes";
import swaggerSpec from "./swagger/swagger";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", userRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;