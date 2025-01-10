import { Request, Response } from 'express';
import { createBorrow, deleteBorrow, findAllBorrows, findBorrowsByUserId } from '../models/borrow.models';
import { APIResponse, logger } from '../utils';
import { checkBookAvailability, updateBookAvailability } from '../models/book.models';

export const getBorrows = async (req: Request, res: Response) => {
    const borrows = await findAllBorrows();
    APIResponse(res, borrows, 'All borrows', 200);
};

export const getBorrowsByUser = async (req: Request, res: Response) => {
    const { id } = req.params;    
    try {
        const borrows = await findBorrowsByUserId(id);        
        if (borrows && borrows.length > 0) {
            APIResponse(res, borrows, 'Borrows found for user', 200);
        } else {
            APIResponse(res, null, 'No borrows found for this user', 404);
        }
    } catch (error) {
        APIResponse(res, null, 'Error retrieving borrows', 500);
    }
};

export const borrowBook = async (req: Request, res: Response) => {
    const { userId, bookId } = req.body;
    try {
        const availability = await checkBookAvailability(bookId);
        console.log("availability", availability);
        if(!availability) {
            APIResponse(res, null, 'Book not available', 400);
        }
        const borrow = await createBorrow(userId, bookId);
        await updateBookAvailability(bookId, false);
        APIResponse(res, borrow, 'Book borrowed', 201);
    } catch (err: any) {
        logger.error(`Erreur lors de l'emprunt du livre: ${err.message}`);
        APIResponse(res, null, 'Error borrowing book', 500);
    }
};

export const returnBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        await deleteBorrow(id);
        await updateBookAvailability(id, true);
        APIResponse(res, null, 'Book returned', 204);
    } catch (err: any) {
        logger.error(`Erreur lors de la retour du livre: ${err.message}`);
        APIResponse(res, null, 'Error returning book', 500);
    }
};
