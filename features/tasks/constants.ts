export enum DueDate {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export const PriorityLabels: Record<Priority, string> = {
  [Priority.Low]: 'Low',
  [Priority.Medium]: 'Medium',
  [Priority.High]: 'High',
};

export enum Status {
  Done = 'done',
  InProgress = 'in_progress',
  Pending = 'pending',
}
