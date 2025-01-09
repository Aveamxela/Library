import { relations } from "drizzle-orm";
import { borrows } from "./borrows";
import { books } from "./books";

export const borrowRelations = relations(borrows, ({ one }) => ({
    book: one(books, {
        fields: [borrows.bookId],
        references: [books.id],
    }),
}));
