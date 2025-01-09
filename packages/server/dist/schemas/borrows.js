"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrows = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const books_1 = require("./books");
exports.borrows = (0, pg_core_1.pgTable)("borrows", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id").notNull(),
    bookId: (0, pg_core_1.uuid)("book_id").notNull().references(() => books_1.books.id, { onDelete: "cascade" }),
    returnDate: (0, pg_core_1.timestamp)("return_date"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
