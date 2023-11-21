import React from "react"
import { Text, View } from "react-native"
import Constants from 'expo-constants'
import TableOrders from "../sales/components/TableOrders"

const Main = () => {
    return(
        <View style={{marginTop:Constants.statusBarHeight, flexGrow: 1 }}>
            <Text>Hola, desde main</Text>
            <TableOrders/>
        </View>
    )
}

export default Main