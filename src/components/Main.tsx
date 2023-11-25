// import React from "react"
// import { Text, View } from "react-native"
import Constants from 'expo-constants'
import Sales from "../sales/components/table-sales/TableOrders"
import { View } from "native-base"
import { ViewBase } from 'react-native'
import Login from '../Login/Login'

export default function Main(){
    return(
        // <View style={{marginTop:Constants.statusBarHeight, flexGrow: 1 }}>
        //     <Sales/>
        // </View>
        <View>
            <Login/>
        </View>
    )
}