import { Request, Response } from "express";

import { deleteBook, findAllBook, findBookById, pushBook, updateBook} from "../models/book.models";
import { APIResponse } from "../utils";

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
    const newBook = req.body;

    await pushBook(newBook);
    APIResponse(res, newBook, "Book created", 201);
}

export const deleteBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    await deleteBook(id);
    APIResponse(res, null, "Book deleted", 204);
}

export const updateBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { book } = req.body;

    await updateBook(id, book);
    APIResponse(res, book, "Book updated", 200);
}