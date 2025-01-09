import { Request, Response } from 'express';
import { createBorrow, deleteBorrow, findAllBorrows, findBorrowsByUserId } from '../models/borrow.models';
import { APIResponse } from '../utils';

export const getBorrows = async (req: Request, res: Response) => {
    const borrows = await findAllBorrows();
    APIResponse(res, borrows, 'All borrows', 200);
};

export const getBorrowsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const borrows = await findBorrowsByUserId(userId);
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
    const { userId, bookId, borrowDate } = req.body;
    const borrow = await createBorrow(userId, bookId);
    APIResponse(res, borrow, 'Book borrowed', 201);
};

export const returnBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteBorrow(id);
    APIResponse(res, null, 'Book returned', 204);
};
