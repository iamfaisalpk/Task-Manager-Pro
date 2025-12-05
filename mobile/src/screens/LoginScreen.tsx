import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import { validateEmail, validatePassword } from '../utils/validation';
import type { AuthStackParamList } from '../navigation/AuthStack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: error });
      dispatch(clearError());
    }
  }, [error]);

  const handleLogin = () => {
    setTouched(true);
    if (!validateEmail(email) || !validatePassword(password)) {
      Toast.show({ type: 'error', text1: 'Please enter valid email and password' });
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-b from-blue-50 to-white"
    >
      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-12">
          <Text className="text-4xl font-bold text-blue-700 mb-2">Welcome Back</Text>
          <Text className="text-gray-600 text-lg">Sign in to continue</Text>
        </View>

        <View className="space-y-5">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-xl px-5 py-4 text-base"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {touched && !validateEmail(email) && (
              <Text className="text-red-500 text-sm mt-1">Invalid email address</Text>
            )}
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-xl px-5 py-4 text-base"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {touched && !validatePassword(password) && (
              <Text className="text-red-500 text-sm mt-1">Password too short</Text>
            )}
          </View>
        </View>

        <Button
          title={status === 'loading' ? 'Signing in...' : 'Login'}
          onPress={handleLogin}
          loading={status === 'loading'}
          className="mt-8"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="mt-6"
        >
          <Text className="text-center text-blue-600 font-medium text-lg">
            Don't have an account? <Text className="font-bold">Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;