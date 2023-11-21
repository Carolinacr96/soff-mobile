import React from 'react'
import Main from './src/components/Main'
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Main/>
    </NativeBaseProvider>
  )
  
}
