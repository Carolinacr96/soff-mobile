'use client'
import React, {useState, useEffect} from "react"
import { useNavigation } from '@react-navigation/native';
import { BoxPurchasesNavigationProp } from "./RootStackParamList";
import { RoutesApi } from "../../../models/routes.models"
import { Text, Box, View, Center, NativeBaseProvider, Flex } from 'native-base';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HeaderModule from "../header-module/HeaderModule";

export const BoxPurchases = () => {
  const [purchases, setPurchases] = useState([])  
  const navigation = useNavigation<BoxPurchasesNavigationProp>();
  
  const handlePurchaseClick = (id: string) => {
    navigation.navigate('SeeDetail', { id });
   };

  const fetchGetPurchases = async () => {
    const response = await fetch(RoutesApi.PURCHASES)
    const json = await response.json()
    setPurchases(json)
  }

  useEffect(()=>{
    fetchGetPurchases()
  }, [])
  

  return <View>
    <Center flex={1} >
      <HeaderModule/>
      {purchases ? (Array.isArray(purchases) && purchases.map((purchase) => (
        <TouchableOpacity onPress={() => handlePurchaseClick(purchase.id)}>
        <Box key={purchase.id} m="2" w="320" bg="white" rounded="md" h="70" borderWidth="1" borderColor="#687990" _text={{
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'black',
        letterSpacing: 'lg'
        
      }}>
        <Flex direction="row" h="58" alignItems="center">
          <Flex direction="column" h="58" p="2" pt="2">
            <Text bold color="gray.500"
            fontSize="xs">Proveedor: {purchase.provider}</Text>
            <Text bold color="gray.500" fontSize="xs">Factura: {purchase.invoice_number}</Text>
            <Text bold color="gray.500" fontSize="xs">Fecha: {format(new Date(purchase.purchase_date), 'dd-MM-yyyy').replace(/-/g, '/')}</Text>
          </Flex>

          <Flex direction="column" h="58" p="2" pt="6" marginRight="5px">
            <Text bold color="gray.500" fontSize="xs">Ordenes: {purchase.amount_order}</Text>
            <Text bold color="gray.500" fontSize="xs">Total: ${purchase.total.toLocaleString('en-US')}</Text>
          </Flex>

          <Ionicons name="ios-arrow-forward" size={18} color="gray" marginRight="10px"/>
      </Flex>

    </Box>
    </TouchableOpacity>
    )
    )):(<Text>Cargando información...</Text>)
    }
    </Center>
</View>
}

