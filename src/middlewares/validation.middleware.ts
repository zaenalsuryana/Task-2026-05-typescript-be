import { Request, Response, NextFunction } from "express";
import { isValidEmail } from "../utils/validation";
import { errorResponse } from "../utils/response";

// Validasi ID
export const validateId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json(
      errorResponse("ID user tidak valid")
    );
  }

  next();
};

// Validasi data user
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

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

  next();
};