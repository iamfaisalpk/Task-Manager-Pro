import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// @ts-ignore
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { restoreToken } from '../redux/slices/authSlice';

const AppNavigator = () => {
  const { token, status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreToken());
  }, [dispatch]);

  if (status === 'loading') return null;

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
