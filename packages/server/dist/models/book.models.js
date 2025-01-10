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
exports.updateBookAvailability = exports.checkBookAvailability = exports.updateBook = exports.deleteBook = exports.findAllBook = exports.findBookById = exports.pushBook = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const utils_1 = require("../utils");
const schemas_1 = require("../schemas");
const pushBook = (book) => {
    try {
        return pool_1.db.insert(schemas_1.books).values(book).returning({ id: schemas_1.books.id, title: schemas_1.books.title }).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la création du livre: ${err.message}`);
        throw new Error('Impossible de créer le livre');
    }
};
exports.pushBook = pushBook;
const findBookById = (id) => {
    try {
        return pool_1.db.select({
            id: schemas_1.books.id,
            title: schemas_1.books.title,
            author: schemas_1.books.author,
            publishedDate: schemas_1.books.publishedDate,
            genre: schemas_1.books.genre,
            available: schemas_1.books.available,
            createdAt: schemas_1.books.created_at
        }).from(schemas_1.books)
            .where((0, drizzle_orm_1.eq)(schemas_1.books.id, id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la sélection du livre: ${err.message}`);
        throw new Error('Impossible de récupérer le livre');
    }
};
exports.findBookById = findBookById;
const findAllBook = () => {
    try {
        return pool_1.db.select({
            id: schemas_1.books.id,
            title: schemas_1.books.title,
            author: schemas_1.books.author,
            publishedDate: schemas_1.books.publishedDate,
            genre: schemas_1.books.genre,
            available: schemas_1.books.available,
            createdAt: schemas_1.books.created_at
        }).from(schemas_1.books)
            .execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération des livres: ${err.message}`);
        throw new Error('Impossible de récupérer les livres');
    }
};
exports.findAllBook = findAllBook;
const deleteBook = (id) => {
    try {
        return pool_1.db.delete(schemas_1.books)
            .where((0, drizzle_orm_1.eq)(schemas_1.books.id, id))
            .execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la suppression du livre: ${err.message}`);
        throw new Error('Impossible de supprimer le livre');
    }
};
exports.deleteBook = deleteBook;
const updateBook = (id, book) => {
    try {
        return pool_1.db.update(schemas_1.books).set(book).where((0, drizzle_orm_1.eq)(schemas_1.books.id, id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la mise à jour du livre: ${err.message}`);
        throw new Error('Impossible de mettre à jour le livre');
    }
};
exports.updateBook = updateBook;
const checkBookAvailability = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [book] = yield pool_1.db // expliquer crochet
            .select()
            .from(schemas_1.books)
            .where((0, drizzle_orm_1.eq)(schemas_1.books.id, bookId))
            .execute();
        if (book && book.available) {
            return true;
        }
        return false;
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la prise d'information sur la disponibilité du livre: ${err.message}`);
        throw new Error(`Impossible d'accéder à la disponibilité du livre`);
    }
});
exports.checkBookAvailability = checkBookAvailability;
const updateBookAvailability = (bookId, available) => {
    try {
        return pool_1.db.update(schemas_1.books)
            .set({ available })
            .where((0, drizzle_orm_1.eq)(schemas_1.books.id, bookId))
            .execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la mise à jour de la disponibilité du livre: ${err.message}`);
        throw new Error('Impossible de mettre à jour la disponibilité du livre');
    }
};
exports.updateBookAvailability = updateBookAvailability;
