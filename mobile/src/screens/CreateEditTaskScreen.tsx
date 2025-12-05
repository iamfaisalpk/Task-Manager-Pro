import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// @ts-ignore
import { useDispatch } from 'react-redux';
import { createTask, updateTask, fetchTasks } from '../redux/slices/taskSlice';
import { AppDispatch } from '../redux/store';
import Button from '../components/Button';
// @ts-ignore
import Toast from 'react-native-toast-message';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { taskService } from '../services/taskService';

const CreateEditTaskScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const editing = !!route.params?.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setLoading(true);
      taskService.getTask(route.params.id)
        .then((res: any) => {
          setTitle(res.task.title);
          setDescription(res.task.description);
          setStatus(res.task.status);
          setPriority(res.task.priority);
          setDueDate(new Date(res.task.dueDate).toISOString().split('T')[0]);
        })
        .finally(() => setLoading(false));
    }
  }, [editing, route.params]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Toast.show({ type: 'error', text1: 'Title is required.' });
      return;
    }
    setLoading(true);
    try {
      if (editing) {
        await dispatch(updateTask({
          id: route.params.id,
          payload: { title, description, status, priority, dueDate },
        })).unwrap();
        Toast.show({ type: 'success', text1: 'Task updated.' });
      } else {
        await dispatch(createTask({
          title, description, status, priority, dueDate,
        })).unwrap();
        Toast.show({ type: 'success', text1: 'Task created.' });
      }
      dispatch(fetchTasks({ page: 1, limit: 10 }));
      navigation.goBack();
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message || 'Error saving task.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-6">
      <Text className="text-xl font-bold mb-4">{editing ? 'Edit Task' : 'Create Task'}</Text>
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Title</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={title}
          onChangeText={setTitle}
          placeholder="Task title"
        />
      </View>
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={description}
          onChangeText={setDescription}
          placeholder="Task description"
          multiline
        />
      </View>
      <View className="mb-4 flex-row">
        <View className="flex-1 mr-2">
          <Text className="mb-1 text-gray-700">Status</Text>
          <View className="flex-row flex-wrap">
            {STATUS_OPTIONS.filter((o: any) => o.value).map((opt: any) => (
              <TouchableOpacity
                key={opt.value}
                className={`px-3 py-1 mr-2 mb-2 rounded-full border ${status === opt.value ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
                onPress={() => setStatus(opt.value)}
              >
                <Text className={status === opt.value ? 'text-white' : 'text-gray-700'}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex-1 ml-2">
          <Text className="mb-1 text-gray-700">Priority</Text>
          <View className="flex-row flex-wrap">
            {PRIORITY_OPTIONS.filter((o: any) => o.value).map((opt: any) => (
              <TouchableOpacity
                key={opt.value}
                className={`px-3 py-1 mr-2 mb-2 rounded-full border ${priority === opt.value ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
                onPress={() => setPriority(opt.value)}
              >
                <Text className={priority === opt.value ? 'text-white' : 'text-gray-700'}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Due Date (YYYY-MM-DD)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="2025-12-31"
        />
      </View>
      <Button
        title={editing ? 'Update Task' : 'Create Task'}
        onPress={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

export default CreateEditTaskScreen;
