import React, { useEffect, useRef } from 'react';

interface AlarmModalProps {
  blockName: string;
  startTime: string;
  onStop: () => void;
}

export const AlarmModal: React.FC<AlarmModalProps> = ({ blockName, startTime, onStop }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<number | null>(null);

  const stopAlarm = () => {
    // Detener todos los osciladores
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Ignorar errores si ya está detenido
      }
    });
    oscillatorsRef.current = [];

    // Limpiar intervalo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cerrar contexto de audio
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Detener vibración
    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }

    onStop();
  };

  const playAlarmSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
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

      oscillatorsRef.current.push(oscillator);

      // Vibrar
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    } catch (error) {
      console.warn('Error reproduciendo alarma:', error);
    }
  };

  useEffect(() => {
    // Reproducir alarma inmediatamente
    playAlarmSound();

    // Reproducir cada 600ms (3 veces por segundo aproximadamente)
    intervalRef.current = window.setInterval(() => {
      playAlarmSound();
    }, 600);

    // Limpiar al desmontar
    return () => {
      stopAlarm();
    };
  }, []);

  // Detener alarma con Escape
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopAlarm();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 border-4 border-red-500 animate-pulse">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🔔</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            ⏰ ¡ALARMA!
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {blockName}
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            En 5 minutos comienza: {blockName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-6">
            Hora: {startTime}
          </p>
          
          <button
            onClick={stopAlarm}
            className="w-full px-6 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            🔇 DETENER ALARMA
          </button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Presiona ESC o haz clic en el botón para detener
          </p>
        </div>
      </div>
    </div>
  );
};

