import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay';

export default function Sales() {
    const {logout, isLoadingSession} = useContext(AuthContext)
    return (
    <View>
        <Spinner visible={isLoadingSession}/>
        <Text>Cerrar Sesión</Text>
        <Button
            title='Cerrar sesión'
            onPress={() => {
                logout()
            }}
        />
    </View>
  )
}
