// Utilidades para manejo de tiempo

// Convertir hora HH:mm a minutos desde medianoche
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Convertir minutos desde medianoche a hora HH:mm
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

// Obtener hora actual en formato HH:mm
export const getCurrentTime = (): string => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

// Obtener fecha actual en formato YYYY-MM-DD
export const getCurrentDate = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Obtener fecha de mañana en formato YYYY-MM-DD
export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
};

// Calcular minutos hasta una hora específica
export const minutesUntil = (targetTime: string): number => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const targetMinutes = timeToMinutes(targetTime);
  
  // Si la hora objetivo ya pasó hoy, calcular para mañana
  if (targetMinutes <= currentMinutes) {
    return 24 * 60 - currentMinutes + targetMinutes;
  }
  
  return targetMinutes - currentMinutes;
};

// Formatear duración en minutos a texto legible
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}min`;
};


