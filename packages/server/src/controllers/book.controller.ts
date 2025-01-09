import { Request, Response } from "express";

import { deleteBook, findAllBook, findBookById, pushBook, updateBook} from "../models/book.models";
import { APIResponse } from "../utils";

export const getBooks = async (request: Request, response: Response) => {
    const books = await findAllBook();
    APIResponse(response, books, "All books", 200);
}

export const getBookById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const book = await findBookById(id);
    if (book) {
        APIResponse(response, book, "Book found", 200);
    } else {
        APIResponse(response, null, "Book not found", 404);
    }
}

export const addBook = async (request: Request, response: Response) => {
    const newBook = request.body;

    await pushBook(newBook);
    APIResponse(response, newBook, "Book created", 201);
}

export const deleteBookById = async (request: Request, response: Response) => {
    const { id } = request.params;
    
    await deleteBook(id);
    APIResponse(response, null, "Book deleted", 204);
}

export const updateBookById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { book } = request.body;

    await updateBook(id, book);
    APIResponse(response, book, "Book updated", 200);
}