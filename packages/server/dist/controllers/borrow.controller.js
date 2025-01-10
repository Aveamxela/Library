"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.getBorrowsByUser = exports.getBorrows = void 0;
const borrow_models_1 = require("../models/borrow.models");
const utils_1 = require("../utils");
const book_models_1 = require("../models/book.models");
const getBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrows = yield (0, borrow_models_1.findAllBorrows)();
    (0, utils_1.APIResponse)(res, borrows, 'All borrows', 200);
});
exports.getBorrows = getBorrows;
const getBorrowsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const borrows = yield (0, borrow_models_1.findBorrowsByUserId)(id);
        if (borrows && borrows.length > 0) {
            (0, utils_1.APIResponse)(res, borrows, 'Borrows found for user', 200);
        }
        else {
            (0, utils_1.APIResponse)(res, null, 'No borrows found for this user', 404);
        }
    }
    catch (error) {
        (0, utils_1.APIResponse)(res, null, 'Error retrieving borrows', 500);
    }
});
exports.getBorrowsByUser = getBorrowsByUser;
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = req.body;
    try {
        const availability = yield (0, book_models_1.checkBookAvailability)(bookId);
        console.log("availability", availability);
        if (!availability) {
            (0, utils_1.APIResponse)(res, null, 'Book not available', 400);
        }
        const borrow = yield (0, borrow_models_1.createBorrow)(userId, bookId);
        yield (0, book_models_1.updateBookAvailability)(bookId, false);
        (0, utils_1.APIResponse)(res, borrow, 'Book borrowed', 201);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de l'emprunt du livre: ${err.message}`);
        (0, utils_1.APIResponse)(res, null, 'Error borrowing book', 500);
    }
});
exports.borrowBook = borrowBook;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, borrow_models_1.deleteBorrow)(id);
        yield (0, book_models_1.updateBookAvailability)(id, true);
        (0, utils_1.APIResponse)(res, null, 'Book returned', 204);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la retour du livre: ${err.message}`);
        (0, utils_1.APIResponse)(res, null, 'Error returning book', 500);
    }
});
exports.returnBook = returnBook;
