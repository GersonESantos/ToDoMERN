import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// Simulating a component to illustrate usage
const AuthStatus = () => {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Auth Status</h1>
      <p>User: {user || 'No user logged in'}</p>
      <p>Token: {token || 'No token available'}</p>
    </div>
  );
};

// Example of setting initial state with mock data
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: 'John Doe', // Mock user
    token: 'abc123xyz', // Mock token
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export { AuthStatus };