import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import SwrProvider from './src/context/SwrContext';
import { AxiosInterceptors } from './src/interceptors/axios-interceptor';

export default function App() {
  return (
    <SwrProvider>
      <AuthProvider>
        <StatusBar backgroundColor='#2563eb' />
        <Navigation />
      </AuthProvider>
    </SwrProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
