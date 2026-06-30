import express from "express";
import swaggerUi from "swagger-ui-express";

import { sequelize } from "./config/database";
import userRoutes from "./routes/user.routes";
import swaggerSpec from "./swagger/swagger";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", userRoutes);

// Global Error Handler
app.use(errorHandler);

// Connect Database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database berhasil terhubung");
  })
  .catch((err) => {
    console.log("Database gagal terhubung:", err);
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});