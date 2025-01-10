import { Request, Response } from "express";

import { deleteBook, findAllBook, findBookById, pushBook, updateBook } from "../models/book.models";
import { APIResponse, logger } from "../utils";
import { isValid, parse, format } from "date-fns";
import { books } from "../schemas";

export const getBooks = async (req: Request, res: Response) => {
    const books = await findAllBook();
    APIResponse(res, books, "All books", 200);
}

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await findBookById(id);
    if (book) {
        APIResponse(res, book, "Book found", 200);
    } else {
        APIResponse(res, null, "Book not found", 404);
    }
}

export const addBook = async (req: Request, res: Response) => {
    const { title, author, publishedDate, genre, available } = req.body;

    const parsedDate = parse(publishedDate, 'dd/MM/yyyy', new Date());

    if (!isValid(parsedDate)) {
        return APIResponse(res, null, "Format de date invalide. Utilisez le format DD/MM/YYYY.", 400);
    }

    const formattedDate = format(parsedDate, 'yyyy-MM-dd');

    const newBook = {
        title,
        author,
        publishedDate: new Date(formattedDate),
        genre,
        available,
    };

    try {
        const createdBook = await pushBook(newBook);
        return APIResponse(res, createdBook, "Livre créé avec succès", 201);
    } catch (err: any) {
        logger.error(`Erreur lors de la création du livre: ${err.message}`);
        return APIResponse(res, null, "Erreur serveur", 500);
    }
};

export const deleteBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteBook(id);
        APIResponse(res, null, "Book deleted", 204);
    } catch (err: any) {
        logger.error(`Erreur lors de la suppression du livre: ${err.message}`);
        return APIResponse(res, null, "Erreur serveur", 500);
    }
}

export const updateBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookUpdates = req.body;
    if (Object.keys(bookUpdates).length === 0) {
        return APIResponse(res, null, "Aucune donnée fournie pour la mise à jour", 400);
    }
    try {
        await updateBook(id, bookUpdates);
        APIResponse(res, bookUpdates, "Book updated", 200);

    } catch (err: any) {
        logger.error(`Erreur lors de la mise à jour du livre: ${err.message}`);
        return APIResponse(res, null, "Erreur serveur", 500);
    }
}