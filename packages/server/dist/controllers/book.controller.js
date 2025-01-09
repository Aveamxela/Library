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
exports.updateBookById = exports.deleteBookById = exports.addBook = exports.getBookById = exports.getBooks = void 0;
const book_models_1 = require("../models/book.models");
const utils_1 = require("../utils");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, book_models_1.findAllBook)();
    (0, utils_1.APIResponse)(res, books, "All books", 200);
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield (0, book_models_1.findBookById)(id);
    if (book) {
        (0, utils_1.APIResponse)(res, book, "Book found", 200);
    }
    else {
        (0, utils_1.APIResponse)(res, null, "Book not found", 404);
    }
});
exports.getBookById = getBookById;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = req.body;
    yield (0, book_models_1.pushBook)(newBook);
    (0, utils_1.APIResponse)(res, newBook, "Book created", 201);
});
exports.addBook = addBook;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, book_models_1.deleteBook)(id);
    (0, utils_1.APIResponse)(res, null, "Book deleted", 204);
});
exports.deleteBookById = deleteBookById;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { book } = req.body;
    yield (0, book_models_1.updateBook)(id, book);
    (0, utils_1.APIResponse)(res, book, "Book updated", 200);
});
exports.updateBookById = updateBookById;
