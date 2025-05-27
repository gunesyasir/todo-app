import { tasks, lists } from '@/db/schema';

export type Task = typeof tasks.$inferSelect;
export type List = typeof lists.$inferSelect;

type AppTask = Omit<Task, 'id'>;
export type SharedTask = Task;
