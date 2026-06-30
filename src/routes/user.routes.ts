import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import {
  validateId,
  validateUser,
} from "../middlewares/validation.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API untuk mengelola data user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Menampilkan semua data user
 *     description: Mengambil seluruh data user yang tersimpan di database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data user
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Menampilkan data user berdasarkan ID
 *     description: Mengambil satu data user berdasarkan ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil mengambil data user
 *       400:
 *         description: ID user tidak valid
 *       404:
 *         description: User tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/users/:id", validateId, getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Menambahkan user baru
 *     description: Menambahkan data user baru ke dalam database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Zaenal
 *               email:
 *                 type: string
 *                 example: zaenal@gmail.com
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       400:
 *         description: Data tidak valid
 *       409:
 *         description: Email sudah digunakan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/users", validateUser, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mengubah data user
 *     description: Mengubah data user berdasarkan ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Zaenal
 *               email:
 *                 type: string
 *                 example: zaenal@gmail.com
 *     responses:
 *       200:
 *         description: User berhasil diperbarui
 *       400:
 *         description: Data tidak valid
 *       404:
 *         description: User tidak ditemukan
 *       409:
 *         description: Email sudah digunakan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put(
  "/users/:id",
  validateId,
  validateUser,
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Menghapus data user
 *     description: Menghapus data user berdasarkan ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       400:
 *         description: ID user tidak valid
 *       404:
 *         description: User tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/users/:id", validateId, deleteUser);

export default router;