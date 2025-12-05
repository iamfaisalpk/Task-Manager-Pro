import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { taskService } from '../services/taskService';
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTasks } from '../redux/slices/taskSlice';
import { AppDispatch } from '../redux/store';
import { formatDateTime } from '../utils/helpers';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import Modal from '../components/Modal';

const TaskDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    taskService
      .getTask(route.params?.id)
      .then((res: any) => setTask(res.task))
      .catch((err) => {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'Failed to load task',
        });
      })
      .finally(() => setLoading(false));
  }, [route.params?.id]);

  const handleDelete = async () => {
    setShowDelete(false);
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      Toast.show({ type: 'success', text1: 'Task deleted successfully.' });
      dispatch(fetchTasks({ page: 1, limit: 10 }));
      navigation.goBack();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err.message || 'Failed to delete task.',
      });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <Text className="text-3xl font-bold mb-3">{task.title}</Text>
      <Text className="text-gray-600 mb-6 text-base">{task.description}</Text>

      <View className="flex-row mb-4">
        <Text className="mr-6">
          Status:{' '}
          <Text className="font-semibold">
            {task.status.replace('_', ' ')}
          </Text>
        </Text>
        <Text>
          Priority:{' '}
          <Text className="font-semibold">{task.priority}</Text>
        </Text>
      </View>

      <Text className="mb-3">
        Due:{' '}
        <Text className="font-semibold">{formatDateTime(task.dueDate)}</Text>
      </Text>
      <Text className="mb-8 text-sm text-gray-400">
        Created: {formatDateTime(task.createdAt)}
      </Text>

      <View className="flex-row gap-4">
        <Button
          title="Edit"
          onPress={() =>
            navigation.navigate('CreateEditTask', { id: task._id })
          }
          className="flex-1"
        />
        <Button
          title="Delete"
          onPress={() => setShowDelete(true)}
          className="flex-1 bg-red-600"
        />
      </View>

      <Modal
        visible={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Task"
      >
        <Text className="text-base mb-6">
          Are you sure you want to delete this task? This action cannot be undone.
        </Text>
        <View className="flex-row gap-4">
          <Button
            title="Cancel"
            onPress={() => setShowDelete(false)}
            className="flex-1 bg-gray-300"
          />
          <Button
            title="Delete"
            onPress={handleDelete}
            className="flex-1 bg-red-600"
          />
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

export default TaskDetailScreen;