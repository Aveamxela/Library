import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { User, NewUser } from "../entities/User";
import { logger } from "../utils";
import { users } from "../schemas/users";


export const getAllUsers = () => {
    try {
        return db.select({
            id: users.id,
            username: users.username,
        })
        .from(users)
        .execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs; ${err.message}`);
        throw new Error("Impossible de récupérer les utilisateurs")
    }
};

export const getUserById = (id: string) => {
    try {
        return db.select({
            id: users.id,
            username: users.username,
            email: users.email,
        })
        .from(users)
        .where(eq(users.id, id))
        .execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur")
    }
};

export const findByCredentials = async (email: string) => {
    try {
        const user = await db.select({
            id: users.id,
            email: users.email,
            username: users.username,
            password: users.password,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)//on en récupère qu'un seul
        .execute();

        return user.length > 0 ? user[0] : null;
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur")
    }
};

export const addUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning({ id: users.id }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de créer l'utilisateur")
    }
};

export const updateUser = (user: Partial<User> & { id: string }) => {
    try {
        return db.update(users).set(user).where(
            eq(users.id, user.id)
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de mise à jour  l'utilisateur; ${err.message}`);
        throw new Error("Impossible de mettre à jour l'utilisateur")
    }
}