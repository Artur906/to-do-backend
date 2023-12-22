-- Check if the column 'due_date' does not exist in the table 'tasks'
DO $$ BEGIN IF NOT EXISTS (
  SELECT
    column_name
  FROM
    information_schema.columns
  WHERE
    table_name = 'tasks'
    AND column_name = 'due_date'
) THEN -- Add the 'due_date' column to the 'tasks' table
ALTER TABLE
  tasks
ADD
  COLUMN due_date timestamp;

END IF;

END $$;