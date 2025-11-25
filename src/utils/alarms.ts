import { ScheduleBlock } from '../types';
import { minutesUntil } from './time';

// Intervalo para verificar alarmas (cada minuto)
let alarmCheckInterval: number | null = null;

// Timeouts activos para cada bloque
const activeAlarms: Map<string, number> = new Map();

// Reproducir sonido de alarma
const playAlarmSound = (): void => {
  try {
    // Crear un sonido de alarma usando Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configurar el sonido de alarma (tono agudo)
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    // Repetir el sonido 3 veces
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 800;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.5);
    }, 200);

    setTimeout(() => {
      const oscillator3 = audioContext.createOscillator();
      const gainNode3 = audioContext.createGain();
      oscillator3.connect(gainNode3);
      gainNode3.connect(audioContext.destination);
      oscillator3.frequency.value = 800;
      oscillator3.type = 'sine';
      gainNode3.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator3.start(audioContext.currentTime);
      oscillator3.stop(audioContext.currentTime + 0.5);
    }, 400);
  } catch (error) {
    console.warn('No se pudo reproducir el sonido de alarma:', error);
  }
};

// Vibrar (si está disponible en móvil)
const vibrate = (): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }
};

// Notificación de alarma
export const showAlarmNotification = (blockName: string, startTime: string, playSound: boolean = true): void => {
  // Reproducir sonido
  if (playSound) {
    playAlarmSound();
    vibrate();
  }

  // Mostrar notificación
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`⏰ Alarma: ${blockName}`, {
      body: `En 5 minutos comienza: ${blockName} (${startTime})`,
      icon: '/vite.svg',
      tag: `alarm-${blockName}`,
      requireInteraction: false,
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

