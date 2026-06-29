import express from "express";
import swaggerUi from "swagger-ui-express";

import { sequelize } from "./config/database";
import userRoutes from "./routes/user.routes";
import swaggerSpec from "./swagger/swagger";

const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", userRoutes);

// Database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});