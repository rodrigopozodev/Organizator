import React, { useState } from 'react';
import { ScheduleBlock as ScheduleBlockType } from '../types';
import { useApp } from '../context/AppContext';
import { TaskList } from './TaskList';
import { getCurrentTime, timeToMinutes } from '../utils/time';

interface ScheduleBlockProps {
  block: ScheduleBlockType;
}

export const ScheduleBlock: React.FC<ScheduleBlockProps> = ({ block }) => {
  const { toggleBlockAlarm } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentTime = getCurrentTime();
  const currentMinutes = timeToMinutes(currentTime);
  const blockStartMinutes = timeToMinutes(block.startTime);
  const blockEndMinutes = timeToMinutes(block.endTime);

  // Determinar si el bloque está activo
  const isActive =
    currentMinutes >= blockStartMinutes && currentMinutes < blockEndMinutes;

  // Determinar si el bloque ya pasó
  const isPast = currentMinutes >= blockEndMinutes;

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        isActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
          : isPast
          ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start sm:items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {block.name}
            </h3>
            {isActive && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full whitespace-nowrap">
                En curso
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            {block.startTime} - {block.endTime}
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => toggleBlockAlarm(block.id)}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              block.alarmEnabled
                ? 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={block.alarmEnabled ? 'Alarma activada' : 'Alarma desactivada'}
          >
            {block.alarmEnabled ? '🔔' : '🔕'}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isExpanded ? 'Ocultar tareas' : 'Mostrar tareas'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <TaskList blockId={block.id} tasks={block.tasks} />
        </div>
      )}
    </div>
  );
};


