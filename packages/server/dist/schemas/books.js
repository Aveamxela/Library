"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.books = (0, pg_core_1.pgTable)("books", {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    author: (0, pg_core_1.varchar)('author', { length: 255 }).notNull(),
    publishedDate: (0, pg_core_1.timestamp)('published_date').notNull(),
    genre: (0, pg_core_1.varchar)('genre', { length: 100 }).notNull(),
    available: (0, pg_core_1.boolean)('available').default(true).notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
