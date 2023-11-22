'use client'
import React, {useState, useEffect} from "react"
import { RoutesApi } from "../../../models/routes.models"
import { Text } from "react-native"
import HeaderModule from "../header-module/HeaderModule"
import { Box, Center,View, NativeBaseProvider } from "native-base"
import { BoxSales } from "./BoxSales"

export default function Sales() {
  return (
    <View >
        <Center flex={1} >
          <HeaderModule/>
          <BoxSales />
        </Center>
    </View>
  )
}