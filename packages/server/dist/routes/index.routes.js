"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const book_routes_1 = __importDefault(require("./book.routes"));
const router = (0, express_1.Router)();
router.use('/books', book_routes_1.default);
router.use('/auth', auth_routes_1.default);
//router.use('/users', userRoutes);
//router.use('/borrows', borrowRoutes);
exports.default = router;
