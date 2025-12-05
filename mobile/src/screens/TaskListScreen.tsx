import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { MainStackParamList } from '../navigation/MainStack';

import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Toast from 'react-native-toast-message';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<MainStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const {
    list,
    page,
    pages,
    limit,
    filters,
    loading,
    error,
    loadTasks,
    updateFilters,
    updatePagination,
  } = useTasks();

  const { signOut } = useAuth();
  const [search, setSearch] = useState(filters.search);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTasks({ page: 1, limit, ...filters });
  }, [filters.status, filters.priority]);

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: error });
    }
  }, [error]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTasks({ page: 1, limit, ...filters }).finally(() => setRefreshing(false));
  };

  const handleLoadMore = () => {
    if (!loading && page < pages) {
      const nextPage = page + 1;
      updatePagination({ page: nextPage, limit });
      loadTasks({ page: nextPage, limit, ...filters });
    }
  };

  const handleSearch = () => {
    updateFilters({ search });
    loadTasks({ page: 1, limit, search, status: filters.status, priority: filters.priority });
  };

  const renderFilterChips = (
    options: { value: string; label: string }[],
    selected: string,
    onSelect: (value: string) => void
  ) => (
    <View className="flex-row flex-wrap mb-2">
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onSelect(opt.value)}
          className={`px-3 py-1.5 mr-2 mb-2 rounded-full border ${
            selected === opt.value
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-gray-300'
          }`}
        >
          <Text className={selected === opt.value ? 'text-white' : 'text-gray-700'}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-6 pb-4 bg-white">
        <Text className="text-2xl font-bold text-gray-900">Tasks</Text>
        <TouchableOpacity onPress={signOut}>
          <Ionicons name="log-out-outline" size={28} color="#dc2626" />
        </TouchableOpacity>
      </View>

      {/* Search & Filters */}
      <View className="px-5 pt-4 bg-white pb-4">
        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 h-12 px-4 bg-gray-50 border border-gray-300 rounded-xl"
            placeholder="Search tasks..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearch} className="ml-3 p-3 bg-blue-600 rounded-xl">
            <Ionicons name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {renderFilterChips(STATUS_OPTIONS, filters.status, (v) => updateFilters({ status: v }))}
        {renderFilterChips(PRIORITY_OPTIONS, filters.priority, (v) => updateFilters({ priority: v }))}
      </View>

      {/* Task List */}
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { id: item._id })}
          />
        )}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={loading ? <Loader /> : <EmptyState message="No tasks found" />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        className="absolute right-6 bottom-8 w-16 h-16 bg-blue-600 rounded-full items-center justify-center shadow-2xl"
        onPress={() => navigation.navigate('CreateEditTask')}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons name="plus" size={32} color="white" />
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default TaskListScreen;