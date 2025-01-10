"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.borrowRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const borrows_1 = require("./borrows");
const books_1 = require("./books");
const users_1 = require("./users");
exports.borrowRelations = (0, drizzle_orm_1.relations)(borrows_1.borrows, ({ one }) => ({
    book: one(books_1.books, {
        fields: [borrows_1.borrows.bookId],
        references: [books_1.books.id],
    }),
}));
exports.userRelations = (0, drizzle_orm_1.relations)(users_1.users, ({ many }) => ({
    borrows: many(borrows_1.borrows),
}));
