import { ScheduleBlock, Theme } from '../types';
import { DEFAULT_SCHEDULE } from '../constants/schedule';

const STORAGE_KEYS = {
  SCHEDULE: 'organizator_schedule',
  THEME: 'organizator_theme',
  ALARMS_ENABLED: 'organizator_alarms_enabled',
} as const;

// Guardar horario en localStorage
export const saveSchedule = (schedule: ScheduleBlock[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  } catch (error) {
    console.error('Error guardando horario:', error);
  }
};

// Cargar horario de localStorage
export const loadSchedule = (): ScheduleBlock[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Asegurar que todas las tareas tengan los campos necesarios
      return parsed.map((block: ScheduleBlock) => ({
        ...block,
        tasks: block.tasks.map((task) => ({
          ...task,
          completed: task.completed || false,
        })),
      }));
    }
  } catch (error) {
    console.error('Error cargando horario:', error);
  }
  return DEFAULT_SCHEDULE;
};

// Guardar tema
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error guardando tema:', error);
  }
};

// Cargar tema
export const loadTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    console.error('Error cargando tema:', error);
  }
  return 'light';
};

// Guardar estado de alarmas
export const saveAlarmsEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ALARMS_ENABLED, String(enabled));
  } catch (error) {
    console.error('Error guardando estado de alarmas:', error);
  }
};

// Cargar estado de alarmas
export const loadAlarmsEnabled = (): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ALARMS_ENABLED);
    return stored !== 'false'; // Por defecto activado
  } catch (error) {
    console.error('Error cargando estado de alarmas:', error);
    return true;
  }
};


