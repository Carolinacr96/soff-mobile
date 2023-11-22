'use client'
import React, {useState, useEffect} from "react"
import { RoutesApi } from "../../../models/routes.models"
import { Text, Box, View, Center, NativeBaseProvider, Flex } from 'native-base';
// import {  } from "react-native"


export const BoxSales = () => {
  const [sales, setSales] = useState([])   
  
  const fetchGetSales = async () => {
    const response = await fetch(RoutesApi.SALES)
    const json = await response.json()
    setSales(json)
  }

  useEffect(()=>{
    fetchGetSales()
  }, [])

  return <View>
    {sales ? (Array.isArray(sales) && sales.map((sale) => (
      <Box key={sale.id} m="2" w="320" bg="white" rounded="md" h="70" borderWidth="1" borderColor="#687990" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'black',
      letterSpacing: 'lg'
      
    }}>
        {/* <View p="2"> */}
      <Flex direction="row" h="58">
        <Flex direction="column" h="58" p="2" pt="2">
            <Text bold color="gray.500"
            fontSize="xs">Cliente: {sale.client}</Text>
            <Text bold color="gray.500" fontSize="xs">Factura: {sale.invoice_number}</Text>
            <Text bold color="gray.500" fontSize="xs">Fecha: {sale.sale_date}</Text>
      </Flex>
      <Flex direction="column" h="58" p="2" pt="6">

            <Text bold color="gray.500" fontSize="xs">Ordenes: {sale.amount_order}</Text>
            <Text bold color="gray.500" fontSize="xs">Total: ${sale.total}</Text>
            </Flex>
         </Flex>

        {/* </View> */}
        {/* <Text mr="2">Simple</Text>
        <Text>Easy</Text>
        <Text>Beautiful</Text> */}
  </Box>
  )
  )):(<Text>Cargando información...</Text>)
  }
</View>
}