import User from "../models/user.model";

// Ambil semua user
export const getAllUsers = async () => {
    return await User.findAll();
};

// Ambil user berdasarkan ID
export const getUserByIdService = async (id: number) => {
    return await User.findByPk(id);
};

// Membuat user baru
export const createUserService = async (name: string, email: string) => {
    // cek email sudah dipakai
    const existingUser = await User.findOne({
        where: { email },
    });

    if (existingUser) {
        throw new Error("EMAIL_EXISTS");
    }

    const newUser = await User.create({
        name,
        email,
    });

    return newUser;
};

// Update user
export const updateUserService = async (
    id: number,
    name: string,
    email: string
) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    // cek email dipakai user lain (selain dirinya sendiri)
    const emailUsedByOther = await User.findOne({
        where: { email },
    });

    if (emailUsedByOther && (emailUsedByOther as any).id !== id) {
        throw new Error("EMAIL_EXISTS");
    }

    await user.update({
        name,
        email,
    });

    return user;
};

// Hapus user
export const deleteUserService = async (id: number) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.destroy();

    return user;
};