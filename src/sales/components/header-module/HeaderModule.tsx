import React from 'react'
import { Text } from 'native-base'
import { View } from 'react-native'

export default function HeaderModule() {
  return (
    <View >
      <Text fontSize="3xl" >Ventas</Text>
      <Text>¡Aquí tienes una lista de todas las ventas realizadas!</Text>
    </View>
  )
}

// scroll-m-20 text-3xl font-extrabold tracking-tight transition-colors first:mt-0