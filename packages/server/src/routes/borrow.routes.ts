import { Router } from 'express';
import { borrowBook, getBorrows, returnBook, getBorrowsByUser } from '../controllers/borrow.controller';
import { authMiddleware } from '../middlewares/auth.middleare';

const router = Router();

router.get('/', getBorrows);

router.get('/user/:id', authMiddleware, getBorrowsByUser);

router.post('/', authMiddleware, borrowBook);

router.delete('/:id', authMiddleware, returnBook);

export default router;
