CREATE TABLE IF NOT EXISTS "users" (
  "id" integer PRIMARY KEY,
  "email" varchar UNIQUE,
  "username" varchar,
  "password_hash" varchar
);

CREATE TABLE IF NOT EXISTS "tasks" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "task_name" varchar,
  "priority" integer,
  "completed" bool,
  "due_date" timestamp,
  "created_at" timestamp
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "user_id" integer
);

CREATE TABLE IF NOT EXISTS "taskCategories" ("task_id" integer, "category_id" integer);

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