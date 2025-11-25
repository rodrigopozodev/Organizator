import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ScheduleBlock, Task, Theme } from '../types';
import { loadSchedule, saveSchedule, loadTheme, saveTheme, loadAlarmsEnabled, saveAlarmsEnabled } from '../utils/storage';
import { startAlarmSystem, stopAlarmSystem, requestNotificationPermission } from '../utils/alarms';
import { getTomorrowDate } from '../utils/time';

interface AlarmModalState {
  isOpen: boolean;
  blockName: string;
  startTime: string;
}

interface AppContextType {
  schedule: ScheduleBlock[];
  theme: Theme;
  alarmsEnabled: boolean;
  alarmModal: AlarmModalState;
  addTask: (blockId: string, text: string) => void;
  toggleTask: (blockId: string, taskId: string) => void;
  deleteTask: (blockId: string, taskId: string) => void;
  editTask: (blockId: string, taskId: string, newText: string) => void;
  postponeTask: (blockId: string, taskId: string) => void;
  toggleBlockAlarm: (blockId: string) => void;
  toggleTheme: () => void;
  toggleAlarms: () => void;
  showAlarmModal: (blockName: string, startTime: string) => void;
  closeAlarmModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleBlock[]>(() => loadSchedule());
  const [theme, setTheme] = useState<Theme>(() => loadTheme());
  const [alarmsEnabled, setAlarmsEnabled] = useState<boolean>(() => loadAlarmsEnabled());
  const [alarmModal, setAlarmModal] = useState<AlarmModalState>({
    isOpen: false,
    blockName: '',
    startTime: '',
  });

  // Aplicar tema al documento
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Mostrar modal de alarma
  const showAlarmModal = useCallback((blockName: string, startTime: string) => {
    setAlarmModal({
      isOpen: true,
      blockName,
      startTime,
    });
  }, []);

  // Cerrar modal de alarma
  const closeAlarmModal = useCallback(() => {
    setAlarmModal({
      isOpen: false,
      blockName: '',
      startTime: '',
    });
  }, []);

  // Inicializar sistema de alarmas
  useEffect(() => {
    requestNotificationPermission();
    startAlarmSystem(schedule, alarmsEnabled, showAlarmModal);

    return () => {
      stopAlarmSystem();
    };
  }, [schedule, alarmsEnabled, showAlarmModal]);

  // Guardar cambios en localStorage
  useEffect(() => {
    saveSchedule(schedule);
  }, [schedule]);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveAlarmsEnabled(alarmsEnabled);
  }, [alarmsEnabled]);

  // Añadir tarea
  const addTask = useCallback((blockId: string, text: string) => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random()}`,
      text: text.trim(),
      completed: false,
      blockId,
      createdAt: Date.now(),
    };

    setSchedule((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? { ...block, tasks: [...block.tasks, newTask] }
          : block
      )
    );
  }, []);

  // Toggle completado de tarea
  const toggleTask = useCallback((blockId: string, taskId: string) => {
    setSchedule((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              tasks: block.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : block
      )
    );
  }, []);

  // Eliminar tarea
  const deleteTask = useCallback((blockId: string, taskId: string) => {
    setSchedule((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              tasks: block.tasks.filter((task) => task.id !== taskId),
            }
          : block
      )
    );
  }, []);

  // Editar tarea
  const editTask = useCallback((blockId: string, taskId: string, newText: string) => {
    if (!newText.trim()) return;

    setSchedule((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              tasks: block.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText.trim() } : task
              ),
            }
          : block
      )
    );
  }, []);

  // Posponer tarea al día siguiente
  const postponeTask = useCallback((blockId: string, taskId: string) => {
    setSchedule((prev) => {
      const tomorrow = getTomorrowDate();
      return prev.map((block) => {
        if (block.id === blockId) {
          const task = block.tasks.find((t) => t.id === taskId);
          if (task) {
            // Marcar tarea como pospuesta
            const updatedTask = { ...task, postponedTo: tomorrow };
            // Mover al primer bloque del día siguiente (o mantener en el mismo bloque)
            // Por simplicidad, la mantenemos en el mismo bloque pero marcada como pospuesta
            return {
              ...block,
              tasks: block.tasks.map((t) =>
                t.id === taskId ? updatedTask : t
              ),
            };
          }
        }
        return block;
      });
    });
  }, []);

  // Toggle alarma de bloque
  const toggleBlockAlarm = useCallback((blockId: string) => {
    setSchedule((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? { ...block, alarmEnabled: !block.alarmEnabled }
          : block
      )
    );
  }, []);

  // Toggle tema
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Toggle alarmas globales
  const toggleAlarms = useCallback(() => {
    setAlarmsEnabled((prev) => !prev);
  }, []);

  const value: AppContextType = {
    schedule,
    theme,
    alarmsEnabled,
    alarmModal,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    postponeTask,
    toggleBlockAlarm,
    toggleTheme,
    toggleAlarms,
    showAlarmModal,
    closeAlarmModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
};


