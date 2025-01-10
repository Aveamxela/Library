import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewBook } from "../entities/Book";
import { logger } from "../utils";
import { books } from "../schemas";


export const pushBook = (book: NewBook) => {
    try {
        return db.insert(books).values(book).returning({ id: books.id, title: books.title }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création du livre: ${err.message}`);
        throw new Error('Impossible de créer le livre')
    }
};

export const findBookById = (id: string) => {
    try {
        return db.select({
            id: books.id,
            title: books.title,
            author: books.author,
            publishedDate: books.publishedDate,
            genre: books.genre,
            available: books.available,
            createdAt: books.created_at
        }).from(books)
        .where(
            eq(books.id, id)
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection du livre: ${err.message}`);
        throw new Error('Impossible de récupérer le livre')
    }
}


export const findAllBook = () => {
    try {
        return db.select({
            id: books.id,
            title: books.title,
            author: books.author,
            publishedDate: books.publishedDate,
            genre: books.genre,
            available: books.available,
            createdAt: books.created_at
        }).from(books)
        .execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des livres: ${err.message}`);
        throw new Error('Impossible de récupérer les livres')
    }
}

export const deleteBook = (id: string) => {
    try {
        return db.delete(books)
        .where(eq(books.id, id))
        .execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la suppression du livre: ${err.message}`);
        throw new Error('Impossible de supprimer le livre')
    }
}


export const updateBook = (id: string, book: NewBook) => {
    try {
        return db.update(books).set(book).where(
            eq(books.id, id)
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la mise à jour du livre: ${err.message}`);
        throw new Error('Impossible de mettre à jour le livre');
    }
}

export const checkBookAvailability = async (bookId: string) => {
    try {
        const [book] = await db // expliquer crochet
            .select()
            .from(books)
            .where(eq(books.id, bookId))
            .execute();

        if (book && book.available) {
            return true;
        }
        return false;
    } catch (err: any) {
        logger.error(`Erreur lors de la prise d'information sur la disponibilité du livre: ${err.message}`);
        throw new Error(`Impossible d'accéder à la disponibilité du livre`);
    }
}

export const updateBookAvailability = (bookId: string, available: boolean) => {
    try{
        return db.update(books)
        .set({ available })
        .where(eq(books.id, bookId))
        .execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la mise à jour de la disponibilité du livre: ${err.message}`);
        throw new Error('Impossible de mettre à jour la disponibilité du livre');
    }
};