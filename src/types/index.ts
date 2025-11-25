// Tipos principales de la aplicación

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  blockId: string;
  createdAt: number;
  postponedTo?: string; // fecha en formato YYYY-MM-DD
}

export interface ScheduleBlock {
  id: string;
  name: string;
  startTime: string; // formato HH:mm
  endTime: string; // formato HH:mm
  tasks: Task[];
  alarmEnabled: boolean;
}

export interface AppState {
  schedule: ScheduleBlock[];
  theme: 'light' | 'dark';
  alarmsEnabled: boolean;
}

export type Theme = 'light' | 'dark';


