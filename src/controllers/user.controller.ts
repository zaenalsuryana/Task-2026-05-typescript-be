import { Request, Response } from "express";
import { isValidEmail } from "../utils/validation";
import {
    getAllUsers,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
} from "../services/user.service";

import { successResponse, errorResponse } from "../utils/response";

interface UserRequestBody {
    name: string;
    email: string;
}

// GET ALL
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();

        return res.json(
            successResponse("Berhasil mengambil data user", users)
        );
    } catch (error) {
        return res.status(500).json(
            errorResponse("Terjadi kesalahan pada server")
        );
    }
};

// GET BY ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json(
                errorResponse("ID user tidak valid")
            );
        }

        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json(
                errorResponse("User tidak ditemukan")
            );
        }

        return res.json(
            successResponse("Berhasil mengambil data user", user)
        );
    } catch (error) {
        return res.status(500).json(
            errorResponse("Terjadi kesalahan pada server")
        );
    }
};

// CREATE
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email }: UserRequestBody = req.body;

        // validasi kosong
        if (!name && !email) {
            return res.status(400).json(
                errorResponse("Nama dan email wajib diisi")
            );
        }

        if (!name) {
            return res.status(400).json(
                errorResponse("Nama wajib diisi")
            );
        }

        if (!email) {
            return res.status(400).json(
                errorResponse("Email wajib diisi")
            );
        }

        if (!isValidEmail(email)) {
            return res.status(400).json(
                errorResponse("Format email tidak valid")
            );
        }

        const newUser = await createUserService(name, email);

        return res.status(201).json(
            successResponse("User berhasil dibuat", newUser)
        );
    } catch (error: any) {
        if (error.message === "EMAIL_EXISTS") {
            return res.status(409).json(
                errorResponse("Email sudah digunakan")
            );
        }

        return res.status(500).json(
            errorResponse("Terjadi kesalahan pada server")
        );
    }
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json(
                errorResponse("ID user tidak valid")
            );
        }

        const { name, email }: UserRequestBody = req.body;

        if (!name && !email) {
            return res.status(400).json(
                errorResponse("Nama dan email wajib diisi")
            );
        }

        if (!name) {
            return res.status(400).json(
                errorResponse("Nama wajib diisi")
            );
        }

        if (!email) {
            return res.status(400).json(
                errorResponse("Email wajib diisi")
            );
        }

        if (!isValidEmail(email)) {
            return res.status(400).json(
                errorResponse("Format email tidak valid")
            );
        }

        const updatedUser = await updateUserService(id, name, email);

        if (!updatedUser) {
            return res.status(404).json(
                errorResponse("User tidak ditemukan")
            );
        }

        return res.json(
            successResponse("User berhasil diperbarui", updatedUser)
        );
    } catch (error: any) {
        if (error.message === "EMAIL_EXISTS") {
            return res.status(409).json(
                errorResponse("Email sudah digunakan")
            );
        }

        return res.status(500).json(
            errorResponse("Terjadi kesalahan pada server")
        );
    }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json(
                errorResponse("ID user tidak valid")
            );
        }

        const deletedUser = await deleteUserService(id);

        if (!deletedUser) {
            return res.status(404).json(
                errorResponse("User tidak ditemukan")
            );
        }

        return res.json(
            successResponse("User berhasil dihapus", deletedUser)
        );
    } catch (error) {
        return res.status(500).json(
            errorResponse("Terjadi kesalahan pada server")
        );
    }
};