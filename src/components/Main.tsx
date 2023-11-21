import React from "react"
import { Text, View } from "react-native"
import Constants from 'expo-constants'
import Sales from "../sales/components/TableOrders"

export default function Main(){
    return(
        <View style={{marginTop:Constants.statusBarHeight, flexGrow: 1 }}>
            <Text>Hola, desde main</Text>
            <Sales/>
        </View>
    )
}
