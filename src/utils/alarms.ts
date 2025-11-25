import { ScheduleBlock } from '../types';
import { minutesUntil } from './time';

// Intervalo para verificar alarmas (cada minuto)
let alarmCheckInterval: number | null = null;

// Timeouts activos para cada bloque
const activeAlarms: Map<string, number> = new Map();

// Notificación de alarma
export const showAlarmNotification = (blockName: string, startTime: string): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`⏰ Alarma: ${blockName}`, {
      body: `En 5 minutos comienza: ${blockName} (${startTime})`,
      icon: '/vite.svg',
      tag: `alarm-${blockName}`,
    });
  }
};

// Solicitar permiso para notificaciones
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('Este navegador no soporta notificaciones');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Configurar alarma para un bloque específico
const setupBlockAlarm = (block: ScheduleBlock, alarmsEnabled: boolean): void => {
  // Limpiar alarma anterior si existe
  const existingTimeout = activeAlarms.get(block.id);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
    activeAlarms.delete(block.id);
  }

  if (!alarmsEnabled || !block.alarmEnabled) {
    return;
  }

  // Calcular minutos hasta el inicio del bloque
  const minutesToStart = minutesUntil(block.startTime);
  
  // Si faltan más de 5 minutos, configurar timeout para que suene exactamente 5 minutos antes
  if (minutesToStart > 5) {
    const millisecondsUntilAlarm = (minutesToStart - 5) * 60 * 1000;
    const timeoutId = window.setTimeout(() => {
      showAlarmNotification(block.name, block.startTime);
      activeAlarms.delete(block.id);
    }, millisecondsUntilAlarm);
    activeAlarms.set(block.id, timeoutId);
  } 
  // Si faltan exactamente 5 minutos o menos (pero el bloque aún no ha comenzado), sonar inmediatamente
  else if (minutesToStart > 0 && minutesToStart <= 5) {
    showAlarmNotification(block.name, block.startTime);
  }
};

// Inicializar sistema de alarmas
export const startAlarmSystem = (
  schedule: ScheduleBlock[],
  alarmsEnabled: boolean
): void => {
  // Limpiar sistema anterior
  stopAlarmSystem();

  if (!alarmsEnabled) {
    return;
  }

  // Configurar alarmas para todos los bloques
  schedule.forEach((block) => {
    setupBlockAlarm(block, alarmsEnabled);
  });

  // Verificar y reconfigurar alarmas cada minuto (por si cambia el horario o se añaden bloques)
  alarmCheckInterval = window.setInterval(() => {
    schedule.forEach((block) => {
      setupBlockAlarm(block, alarmsEnabled);
    });
  }, 60000); // Cada minuto
};

// Detener sistema de alarmas
export const stopAlarmSystem = (): void => {
  if (alarmCheckInterval !== null) {
    clearInterval(alarmCheckInterval);
    alarmCheckInterval = null;
  }

  // Limpiar todos los timeouts activos
  activeAlarms.forEach((timeout) => clearTimeout(timeout));
  activeAlarms.clear();
};

