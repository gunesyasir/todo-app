import { z } from 'zod';

import { translations } from '@/constants/translations';
import { Priority, Status } from '@/features/tasks/constants';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const taskCreateSchema = z.object({
  name: z.string().min(3, 'Task name must be 3 characters at least.'),
  description: z.string().optional(),
  image: z.string().url(translations.task.imageError).optional(),
  status: z.nativeEnum(Status).default(Status.Pending),
  priority: z.nativeEnum(Priority).default(Priority.Medium),
  is_completed: z.boolean(),
  due_date: z.coerce
    .date()
    .min(today, translations.task.dueDateCondition)
    .transform((val) => val.toISOString())
    .optional(),
  list_id: z.number().int(),
});

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>;
