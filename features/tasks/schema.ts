import { z } from 'zod';

import { Priority, Status } from '@/features/tasks/constants';

export const taskCreateSchema = z.object({
  name: z.string().min(3, 'Task name must be 3 characters at least.'),
  description: z.string().optional(),
  image: z.string().url('Must be a valid URL').optional(),
  status: z.nativeEnum(Status).default(Status.Pending),
  priority: z.nativeEnum(Priority).default(Priority.Medium),
  is_completed: z.boolean(),
  due_date: z.string().date().optional(),
  list_id: z.number().int(),
});

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>;
