import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout, clearError } from '../redux/slices/authSlice';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const signOut = () => dispatch(logout());
  const clearAuthError = () => dispatch(clearError());

  return { ...auth, signOut, clearAuthError };
};
