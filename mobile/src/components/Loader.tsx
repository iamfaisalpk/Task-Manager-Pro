import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <View className="flex-1 items-center justify-center py-8">
    <ActivityIndicator size="large" color="#2563eb" />
  </View>
);

export default Loader;
