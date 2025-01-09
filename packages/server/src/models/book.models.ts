import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewBook } from "../entities/Book";
import { books } from "../schemas";
import { logger } from "../utils";


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
        return db.delete(books).where(
            eq(books.id, id)
        ).execute();
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
        return null;
    }
}