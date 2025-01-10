import { relations } from "drizzle-orm";
import { borrows } from "./borrows";
import { books } from "./books";
import { users } from "./users";

export const borrowRelations = relations(borrows, ({ one }) => ({
    book: one(books, {
        fields: [borrows.bookId],
        references: [books.id],
    }),
}));

export const userRelations = relations(users, ({ many }) => ({
    borrows: many(borrows), 
}));
