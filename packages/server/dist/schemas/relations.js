"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const borrows_1 = require("./borrows");
const books_1 = require("./books");
exports.borrowRelations = (0, drizzle_orm_1.relations)(borrows_1.borrows, ({ one }) => ({
    book: one(books_1.books, {
        fields: [borrows_1.borrows.bookId],
        references: [books_1.books.id],
    }),
}));
