import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme, alarmsEnabled, toggleAlarms } = useApp();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
            📅 Organizator
          </h1>
          
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggleAlarms}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                alarmsEnabled
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
              title={alarmsEnabled ? 'Desactivar alarmas' : 'Activar alarmas'}
            >
              <span className="hidden sm:inline">
                {alarmsEnabled ? '🔔 Alarmas ON' : '🔕 Alarmas OFF'}
              </span>
              <span className="sm:hidden">
                {alarmsEnabled ? '🔔' : '🔕'}
              </span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


