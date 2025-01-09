import { eq} from "drizzle-orm";
import { db } from "../config/pool";
import { logger } from "../utils";
import { borrows } from "../schemas/borrows";
import { books } from "../schemas";

export const createBorrow = (userId: string, bookId: string) => {
    try {
        return db.insert(borrows).values({
            userId,
            bookId,
        }).returning().execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de l'emprunt: ${err.message}`);
        throw new Error('Impossible de créer l\'emprunt');
    }
};

export const findBorrowsByUserId = (userId: string) => {
    try {
        return db
            .select()
            .from(borrows)
            .innerJoin(books, eq(borrows.bookId, books.id))
            .where(eq(borrows.userId, userId))
            .execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des emprunts pour l'utilisateur ${userId}: ${err.message}`);
        throw new Error(`Impossible de récupérer les emprunts pour l'utilisateur ${userId}`);
    }
};


export const findAllBorrows = () => {
    try {
        return db.select().from(borrows).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des emprunts: ${err.message}`);
        throw new Error('Impossible de récupérer les emprunts');
    }
};

export const deleteBorrow = (id: string) => {
    try {
        return db.delete(borrows).where(eq(borrows.id, id)).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la suppression de l'emprunt: ${err.message}`);
        throw new Error('Impossible de supprimer l\'emprunt');
    }
};
