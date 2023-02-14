import React from 'react';
import Main from './src/Main';
import { AuthContextProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}








