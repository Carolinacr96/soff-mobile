// import React from "react"
// import { Text, View } from "react-native"
import Constants from 'expo-constants'
import Sales from "../sales/components/table-sales/TableOrders"
import { View } from "native-base"

export default function Main(){
    return(
        <View bg="blue.100" style={{marginTop:Constants.statusBarHeight, flexGrow: 1 }}>
            <Sales/>
        </View>
    )
}
