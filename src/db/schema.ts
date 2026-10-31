import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

// Users table keyed by Firebase Auth UID
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase Auth UID
  email: text("email").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("customer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Orders table referencing user
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.uid)
    .notNull(),
  orderNumber: text("order_number").notNull().unique(),
  totalLkr: integer("total_lkr").notNull(),
  shippingDistrict: text("shipping_district").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  status: text("status").default("processing").notNull(),
  items: jsonb("items").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

// Order Relations
export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.uid],
  }),
}));
