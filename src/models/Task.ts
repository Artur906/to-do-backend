export interface Task {
  id: number,
  user_id: number,
  task_name: string,
  priority: number,
  completed: boolean,
  created_at: Date,
  due_date?: Date
}