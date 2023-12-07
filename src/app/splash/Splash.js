import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function Splash() {
  return (
    <View style={{flex:1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
        <ActivityIndicator color='#ffffff' size='large' />
    </View>
  )
}
