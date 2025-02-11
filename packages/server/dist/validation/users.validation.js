"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
exports.userValidation = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Le nom est requis" }),
    password: zod_1.z.string()
        .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un symbole" }),
    email: zod_1.z.string()
        .email({ message: "Adresse email invalide" })
});
