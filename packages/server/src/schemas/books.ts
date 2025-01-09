import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    publishedDate: timestamp('published_date').notNull(),
    genre: varchar('genre', { length: 100 }).notNull(),
    available: boolean('available').default(true).notNull(),
    created_at: timestamp('created_at').defaultNow(),
});