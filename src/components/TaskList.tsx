import React, { useState } from 'react';
import { Task } from '../types';
import { useApp } from '../context/AppContext';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  blockId: string;
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ blockId, tasks }) => {
  const { addTask } = useApp();
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(blockId, newTaskText);
      setNewTaskText('');
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Añadir tarea..."
          className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
        >
          Añadir
        </button>
      </form>

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
            No hay tareas aún
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} blockId={blockId} />
          ))
        )}
      </div>
    </div>
  );
};


