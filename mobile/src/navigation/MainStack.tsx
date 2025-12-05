import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import CreateEditTaskScreen from '../screens/CreateEditTaskScreen';

export type MainStackParamList = {
  TaskList: undefined;
  TaskDetail: { id: string };
  CreateEditTask: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
    <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
    <Stack.Screen name="CreateEditTask" component={CreateEditTaskScreen} options={{ title: 'Task' }} />
  </Stack.Navigator>
);

export default MainStack;
