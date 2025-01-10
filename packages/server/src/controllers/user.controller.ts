import { Request, Response } from "express";

import { APIResponse, logger } from "../utils"
import { getAllUsers, getUserById } from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
    try {
        logger.info("[GET] /users - Récupérer tout les utilisateurs");
        const users = await getAllUsers();

        APIResponse(res, users, "List of all users", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        APIResponse(res, null, error.message, 500);
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);

    if (user) {
        APIResponse(res, user, "User found");
    } else {
        APIResponse(res, null, "User not found", 404);
    }
};