import React, { useState } from 'react';
import { requestNotificationPermission, showAlarmNotification } from '../utils/alarms';

export const AlarmTest: React.FC = () => {
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');

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

  const testNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      showAlarmNotification('Prueba', '12:00');
    } else {
      alert('Por favor, primero permite las notificaciones');
    }
  };

  React.useEffect(() => {
    checkPermission();
  }, []);

  return (
    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
      <p className="text-xs sm:text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
        🔔 Prueba de Notificaciones
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={requestPermission}
          className="px-3 py-1.5 text-xs sm:text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          {permissionStatus === 'granted' ? '✅ Permisos OK' : 'Permitir Notificaciones'}
        </button>
        {permissionStatus === 'granted' && (
          <button
            onClick={testNotification}
            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Probar Alarma Ahora
          </button>
        )}
        <span className="text-xs text-yellow-700 dark:text-yellow-300 self-center">
          Estado: {permissionStatus === 'granted' ? '✅ Activo' : permissionStatus === 'denied' ? '❌ Denegado' : '⏳ Pendiente'}
        </span>
      </div>
    </div>
  );
};

