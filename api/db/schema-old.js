import { pgTable, uuid, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id'),
  serviceId: uuid('service_id'),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  date: varchar('date').notNull(),
  time: varchar('time').notNull(),
  status: varchar('status').notNull().default('pending'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Add more tables here as needed
