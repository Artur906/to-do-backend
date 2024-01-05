CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid DEFAULT uuid_generate_v4 (),
  "email" varchar UNIQUE,
  "username" varchar,
  "password_hash" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tasks" (
  "id" uuid DEFAULT uuid_generate_v4 (),
  "user_id" uuid NOT NULL,
  "task_name" varchar NOT NULL,
  "priority" integer NOT NULL,
  "completed" bool DEFAULT false,
  "due_date" timestamp,
  "created_at" timestamp,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" uuid DEFAULT uuid_generate_v4 (),
  "name" varchar NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "taskCategories" (
  "task_id" uuid NOT NULL,
  "category_id" uuid NOT NULL
);

ALTER TABLE
  "taskCategories"
ADD
  FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");

ALTER TABLE
  "taskCategories"
ADD
  FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE
  "categories"
ADD
  FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE
  "tasks"
ADD
  FOREIGN KEY ("user_id") REFERENCES "users" ("id");