import { NavigationContainer } from '@react-navigation/native';
import Main from './src/components/Main'
import React from 'react'
import { NativeBaseProvider, View } from 'native-base';

export default function App() {
 return (
   <NavigationContainer>
    <NativeBaseProvider>
     <Main />
    </NativeBaseProvider>
   </NavigationContainer>
 );
}
