import React from 'react';
import { View, Text } from 'react-native';

const EmptyState: React.FC<{ message?: string }> = ({ message }) => (
  <View className="flex-1 items-center justify-center py-12">
    <Text className="text-gray-400 text-lg">{message || 'No data found.'}</Text>
  </View>
);

export default EmptyState;
