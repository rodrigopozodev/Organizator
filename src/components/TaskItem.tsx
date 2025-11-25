import React, { useState } from 'react';
import { Task } from '../types';
import { useApp } from '../context/AppContext';

interface TaskItemProps {
  task: Task;
  blockId: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, blockId }) => {
  const { toggleTask, deleteTask, editTask, postponeTask } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== task.text) {
      editTask(blockId, task.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(blockId, task.id)}
        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          className="flex-1 px-2 py-1 text-xs sm:text-sm border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-xs sm:text-sm break-words ${
            task.completed
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-900 dark:text-gray-100'
          }`}
          onDoubleClick={handleEdit}
        >
          {task.text}
          {task.postponedTo && (
            <span className="ml-1 sm:ml-2 text-xs text-orange-500">(Pospuesta)</span>
          )}
        </span>
      )}

      <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
        <button
          onClick={() => postponeTask(blockId, task.id)}
          className="p-1 text-xs sm:text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
          title="Posponer al día siguiente"
        >
          ⏭️
        </button>
        <button
          onClick={() => deleteTask(blockId, task.id)}
          className="p-1 text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          title="Eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};


