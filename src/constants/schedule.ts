import { ScheduleBlock } from '../types';

// Horario fijo diario
export const DEFAULT_SCHEDULE: ScheduleBlock[] = [
  {
    id: 'breakfast',
    name: 'Desayuno',
    startTime: '08:00',
    endTime: '08:15',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'shower',
    name: 'Ducha',
    startTime: '08:15',
    endTime: '08:30',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'gym',
    name: 'Gimnasio',
    startTime: '08:30',
    endTime: '10:30',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'programming',
    name: 'Programar',
    startTime: '10:30',
    endTime: '14:30',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'lunch',
    name: 'Comer',
    startTime: '14:30',
    endTime: '15:30',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'lol',
    name: 'Jugar al LoL',
    startTime: '15:30',
    endTime: '19:30',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'rest',
    name: 'Descanso',
    startTime: '20:00',
    endTime: '23:00',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'light-disconnect',
    name: 'Desconexión ligera',
    startTime: '23:00',
    endTime: '24:00',
    tasks: [],
    alarmEnabled: true,
  },
  {
    id: 'sleep',
    name: 'Dormir',
    startTime: '24:00',
    endTime: '24:00',
    tasks: [],
    alarmEnabled: true,
  },
];


