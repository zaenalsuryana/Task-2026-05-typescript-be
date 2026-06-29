import app from "./app";
import { sequelize } from "./config/database";

const PORT = 3000;

// Connect database
sequelize
    .authenticate()
    .then(() => {
        console.log("Database berhasil terhubung");
    })
    .catch((err) => {
        console.log("Database gagal terhubung:", err);
    });

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});