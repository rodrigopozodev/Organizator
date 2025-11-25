import React, { useState } from 'react';
import { requestNotificationPermission, showAlarmNotification } from '../utils/alarms';

export const AlarmTest: React.FC = () => {
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [isPlaying, setIsPlaying] = useState(false);

  const checkPermission = () => {
    if (!('Notification' in window)) {
      setPermissionStatus('not-supported');
      return;
    }
    setPermissionStatus(Notification.permission);
  };

  const requestPermission = async () => {
    const granted = await requestNotificationPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
  };

  const testAlarm = () => {
    setIsPlaying(true);
    
    // Probar alarma con sonido (sin modal para la prueba, solo sonido)
    showAlarmNotification('Prueba de Alarma', '12:00', true);
    
    // Si no hay permisos de notificación, aún reproducir el sonido
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      // Forzar reproducción del sonido aunque no haya notificación
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);

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
        setIsPlaying(false);
      }, 400);
    } else {
      setTimeout(() => setIsPlaying(false), 500);
    }
  };

  React.useEffect(() => {
    checkPermission();
  }, []);

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-800 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🔔</span>
        <p className="text-sm sm:text-base font-bold text-yellow-900 dark:text-yellow-200">
          Prueba de Alarma
        </p>
      </div>
      
      <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-300 mb-3">
        Prueba cómo sonará la alarma cuando llegue el momento. Incluye sonido, vibración y notificación.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <button
          onClick={requestPermission}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            permissionStatus === 'granted'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          {permissionStatus === 'granted' ? '✅ Permisos OK' : '🔓 Permitir Notificaciones'}
        </button>
        
        <button
          onClick={testAlarm}
          disabled={isPlaying}
          className={`px-6 py-3 text-base font-bold rounded-lg transition-all transform ${
            isPlaying
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95 shadow-lg'
          }`}
        >
          {isPlaying ? '⏳ Sonando...' : '🔊 PROBAR ALARMA AHORA'}
        </button>
        
        <div className="flex items-center justify-center sm:justify-start">
          <span className={`text-xs px-3 py-2 rounded-full ${
            permissionStatus === 'granted'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : permissionStatus === 'denied'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {permissionStatus === 'granted' 
              ? '✅ Notificaciones activas' 
              : permissionStatus === 'denied' 
              ? '❌ Notificaciones denegadas' 
              : '⏳ Permisos pendientes'}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-yellow-300 dark:border-yellow-700">
        <p className="text-xs text-yellow-700 dark:text-yellow-400">
          💡 <strong>Nota:</strong> El sonido funcionará siempre. Las notificaciones requieren permisos del navegador.
        </p>
      </div>
    </div>
  );
};

