import { Router } from 'express';

import authRoutes from "./auth.routes"
import bookRoutes from "./book.routes"

const router = Router();

router.use('/books', bookRoutes);

router.use('/auth', authRoutes);
//router.use('/users', userRoutes);

//router.use('/borrows', borrowRoutes);

export default router;