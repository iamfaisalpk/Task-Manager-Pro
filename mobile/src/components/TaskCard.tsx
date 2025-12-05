import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../redux/slices/taskSlice';
import { formatDate } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors: Record<string, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => (
  <TouchableOpacity
    className="bg-white rounded-xl shadow-sm p-4 mb-3 flex-row items-center"
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View className="flex-1">
      <Text className="font-semibold text-base mb-1">{task.title}</Text>
      <Text className="text-gray-500 text-xs mb-1" numberOfLines={1}>
        {task.description}
      </Text>
      <View className="flex-row space-x-2 mt-1">
        <Text className={`px-2 py-0.5 rounded text-xs ${statusColors[task.status] || 'bg-gray-100 text-gray-700'}`}>
          {task.status.replace('_', ' ').toUpperCase()}
        </Text>
        <Text className={`px-2 py-0.5 rounded text-xs ${priorityColors[task.priority] || 'bg-gray-100 text-gray-700'}`}>
          {task.priority.toUpperCase()}
        </Text>
        <Text className="text-gray-400 text-xs ml-auto">{formatDate(task.dueDate)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default TaskCard;
