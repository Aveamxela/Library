import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { env } from "../config/env";

import { addUser, findByCredentials } from "../models/user.model";
import { APIResponse, logger } from "../utils";
import { hashPassword, verifyPassword } from "../utils/password";
import { userValidation } from "../validation/users.validation";

const { NODE_ENV, JWT_SECRET } = env;

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = userValidation.parse(req.body);
        const emailAlreadyExists = await findByCredentials(email);
        if (emailAlreadyExists)
            return APIResponse(res, [], "Cet email est déjà utilisé", 400);

        const hash = await hashPassword(password);
        if (!hash)
            throw new Error("Erreur lors du hashage du mot de passe");

        const [ newUser ] = await addUser({ username, email, password: hash });
        if (!newUser)
            return APIResponse(res, [], "Erreur lors de la création de l'utilisateur", 500); 

        return APIResponse(res, newUser.id, "Vous êtes inscrit", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`)
        if (err instanceof z.ZodError) {
            return APIResponse(res, err.errors, "Formulaire incorrect", 400)
        }
        APIResponse(res, null, "Erreur serveur", 500);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await findByCredentials(email);
        if (!user)
            return APIResponse(res, [], "Email ou mot de passe invalide", 400);

        if (await verifyPassword(user.password, password) === false) {
            return APIResponse(res, [], "Email ou mot de passe invalide", 400);
        }

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '5h' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true, 
            sameSite: 'strict',
            secure: NODE_ENV === "production"
        });

        APIResponse(res, null, "Vous êtes connecté", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);
        APIResponse(res, null, "Erreur serveur", 500);
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    APIResponse(res, null, "Vous êtes déconnecté", 200);
}