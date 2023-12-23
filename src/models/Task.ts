export interface Task {
  id: number,
  user_id: number,
  task_name: string,
  priority: 1 | 2 | 3, // high | medium | low
  completed: boolean,
  created_at: Date,
  due_date?: Date
}