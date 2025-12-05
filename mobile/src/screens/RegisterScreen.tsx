import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import Button from '../components/Button';
// @ts-ignore
import Toast from 'react-native-toast-message';
import { validateEmail, validatePassword, validateRequired } from '../utils/validation';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: error });
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (status === 'succeeded') {
      Toast.show({ type: 'success', text1: 'Registration successful! Please login.' });
      navigation.navigate('Login' as never);
    }
  }, [status]);

  const handleRegister = () => {
    setTouched(true);
    if (!validateRequired(name) || !validateEmail(email) || !validatePassword(password)) {
      Toast.show({ type: 'error', text1: 'Please fill all fields correctly.' });
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center px-6 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="mb-8">
        <Text className="text-3xl font-bold mb-2 text-blue-700">Register</Text>
        <Text className="text-gray-500">Create a new account</Text>
      </View>
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        {touched && !validateRequired(name) && (
          <Text className="text-xs text-red-500 mt-1">Name is required.</Text>
        )}
      </View>
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
        />
        {touched && !validateEmail(email) && (
          <Text className="text-xs text-red-500 mt-1">Enter a valid email.</Text>
        )}
      </View>
      <View className="mb-4">
        <Text className="mb-1 text-gray-700">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        {touched && !validatePassword(password) && (
          <Text className="text-xs text-red-500 mt-1">Password must be at least 6 characters.</Text>
        )}
      </View>
      <Button
        title="Register"
        onPress={handleRegister}
        loading={status === 'loading'}
        className="mb-4"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text className="text-blue-600 text-center">Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
