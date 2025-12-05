import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
// @ts-ignore
import { cn } from 'nativewind';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, loading, disabled, className }) => (
  <TouchableOpacity
    className={cn(
      'bg-blue-600 rounded-lg py-3 px-4 items-center justify-center',
      disabled ? 'opacity-50' : '',
      className
    )}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text className="text-white font-semibold text-base">{title}</Text>
    )}
  </TouchableOpacity>
);

export default Button;
