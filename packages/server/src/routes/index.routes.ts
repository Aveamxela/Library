import { Router } from 'express';

import authRoutes from "./auth.routes"
import bookRoutes from "./book.routes"
import borrowRoutes from "./borrow.routes"
import userRoutes from "./user.routes"

const router = Router();

router.use('/books', bookRoutes);

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/borrows', borrowRoutes);

export default router;