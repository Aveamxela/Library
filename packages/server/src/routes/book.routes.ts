import { Router } from 'express';
import { addBook, deleteBookById, getBookById, getBooks, updateBookById } from '../controllers/book.controller';
import { authMiddleware } from '../middlewares/auth.middleare';

const router = Router();

router.get('/', getBooks);

router.get('/:id', getBookById);

router.post('/', authMiddleware, addBook);

router.put('/:id', authMiddleware, updateBookById);

router.delete('/:id', authMiddleware, deleteBookById);

export default router;