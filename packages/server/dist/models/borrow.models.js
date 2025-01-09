"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBorrow = exports.findAllBorrows = exports.findBorrowsByUserId = exports.createBorrow = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const utils_1 = require("../utils");
const borrows_1 = require("../schemas/borrows");
const schemas_1 = require("../schemas");
const createBorrow = (userId, bookId) => {
    try {
        return pool_1.db.insert(borrows_1.borrows).values({
            userId,
            bookId,
        }).returning().execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la création de l'emprunt: ${err.message}`);
        throw new Error('Impossible de créer l\'emprunt');
    }
};
exports.createBorrow = createBorrow;
const findBorrowsByUserId = (userId) => {
    try {
        return pool_1.db
            .select()
            .from(borrows_1.borrows)
            .innerJoin(schemas_1.books, (0, drizzle_orm_1.eq)(borrows_1.borrows.bookId, schemas_1.books.id))
            .where((0, drizzle_orm_1.eq)(borrows_1.borrows.userId, userId))
            .execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération des emprunts pour l'utilisateur ${userId}: ${err.message}`);
        throw new Error(`Impossible de récupérer les emprunts pour l'utilisateur ${userId}`);
    }
};
exports.findBorrowsByUserId = findBorrowsByUserId;
const findAllBorrows = () => {
    try {
        return pool_1.db.select().from(borrows_1.borrows).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération des emprunts: ${err.message}`);
        throw new Error('Impossible de récupérer les emprunts');
    }
};
exports.findAllBorrows = findAllBorrows;
const deleteBorrow = (id) => {
    try {
        return pool_1.db.delete(borrows_1.borrows).where((0, drizzle_orm_1.eq)(borrows_1.borrows.id, id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la suppression de l'emprunt: ${err.message}`);
        throw new Error('Impossible de supprimer l\'emprunt');
    }
};
exports.deleteBorrow = deleteBorrow;
