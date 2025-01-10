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
const date_fns_1 = require("date-fns");
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
    const { title, author, publishedDate, genre, available } = req.body;
    const parsedDate = (0, date_fns_1.parse)(publishedDate, 'dd/MM/yyyy', new Date());
    if (!(0, date_fns_1.isValid)(parsedDate)) {
        return (0, utils_1.APIResponse)(res, null, "Format de date invalide. Utilisez le format DD/MM/YYYY.", 400);
    }
    const formattedDate = (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
    const newBook = {
        title,
        author,
        publishedDate: new Date(formattedDate),
        genre,
        available,
    };
    try {
        const createdBook = yield (0, book_models_1.pushBook)(newBook);
        return (0, utils_1.APIResponse)(res, createdBook, "Livre créé avec succès", 201);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la création du livre: ${err.message}`);
        return (0, utils_1.APIResponse)(res, null, "Erreur serveur", 500);
    }
});
exports.addBook = addBook;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, book_models_1.deleteBook)(id);
        (0, utils_1.APIResponse)(res, null, "Book deleted", 204);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la suppression du livre: ${err.message}`);
        return (0, utils_1.APIResponse)(res, null, "Erreur serveur", 500);
    }
});
exports.deleteBookById = deleteBookById;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookUpdates = req.body;
    if (Object.keys(bookUpdates).length === 0) {
        return (0, utils_1.APIResponse)(res, null, "Aucune donnée fournie pour la mise à jour", 400);
    }
    try {
        yield (0, book_models_1.updateBook)(id, bookUpdates);
        (0, utils_1.APIResponse)(res, bookUpdates, "Book updated", 200);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la mise à jour du livre: ${err.message}`);
        return (0, utils_1.APIResponse)(res, null, "Erreur serveur", 500);
    }
});
exports.updateBookById = updateBookById;
