import { z } from "zod";

export const userValidation = z.object({
    username: z.string().min(1, { message: "Le nom est requis"}),
    password: z.string()
        .min(6, { message: "Le mot de passe doit faire au moins 6 caractères"})
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un symbole" }),
    email: z.string()
        .email({ message: "Adresse email invalide" })
});