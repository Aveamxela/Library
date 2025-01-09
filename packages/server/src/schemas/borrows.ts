import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { books } from "./books";

export const borrows = pgTable("borrows", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    bookId: uuid("book_id").notNull().references(() => books.id, { onDelete: "cascade" }),
    returnDate: timestamp("return_date"),
    created_at: timestamp("created_at").defaultNow(),
});
