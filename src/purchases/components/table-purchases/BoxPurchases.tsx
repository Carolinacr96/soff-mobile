'use client'
import React, {useState, useEffect} from "react"
import { useNavigation } from '@react-navigation/native';
import { BoxPurchasesNavigationProp } from "./RootStackParamList";
import { RoutesApi } from "../../../models/routes.models"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import HeaderModule from "../header-module/HeaderModule";

export const BoxPurchases = () => {
  const [purchases, setPurchases] = useState([])  
  const [searchData, setSearchData] = useState("")  
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

  const search = (text: string)=>{
    setSearchData(text)
  }

  const filterPurchases = purchases.filter((purchase) =>
    purchase.provider.toLowerCase().includes(searchData.toLowerCase())
  );
  

  return <View  style={styles.container}>
      <HeaderModule/>
      <TextInput
      placeholder="Buscar por proveedor..."
      value={searchData}
      onChangeText={search}
      style={styles.input}
    />
    {
      purchases.length === 0 ? (
        <Text>No se encontraron resultados</Text>
      ):(
          filterPurchases.length === 0 ? (
            <Text>No se encontró <strong>{searchData}</strong></Text>
          ):(
            filterPurchases.map((purchase) => (
              <TouchableOpacity onPress={() => handlePurchaseClick(purchase.id)}>
                <View key={purchase.id} style={styles.box}>
                  <View style={styles.flex1}>
                    <Text style={styles.text}>Factura: {purchase.invoice_number}</Text>
                    <Text style={styles.text}>Proveedor: {purchase.provider}</Text>
                    <Text style={styles.text}>Fecha: {format(new Date(purchase.purchase_date), 'dd-MM-yyyy').replace(/-/g, '/')}</Text>
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.text}>Ordenes: {purchase.amount_order}</Text>
                    <Text style={styles.text}>Total: ${purchase.total.toLocaleString('en-US')}</Text>
                  </View>
                  <View style={styles.icon}>
                    <Ionicons name="ios-arrow-forward" size={18} color="gray" marginRight="10px"/>
                  </View>
                </View>
              </TouchableOpacity>    
            ))
          )
        )
      }
        {/* <Flex direction="row" h="58" alignItems="center">
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
    } */}
</View>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  box :{
    margin:2,
    width:320,
    backgroundColor:"white",
    borderRadius:10,
    height:'auto',
    borderWidth:1,
    borderColor:"#687990", 
    marginBottom: 10,
    flexDirection:"row"
  },
  text:{
    fontSize: 12,
    fontWeight: 'bold',
    color:"gray"
  },
  flex:{
    flexDirection:"column",
    height:58,
    padding:10,
    paddingLeft:0
  },
  flex1:{
    flexDirection:"column",
    margin: 10,

    marginRight: 0,
    width:200
  },
  icon:{
    paddingTop: 25,
    padding:10,
    flexDirection:"column"
  },
  input:{
    height: 40,
    width:320,
    color: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10,
    marginBottom:15,
    padding: 8,
  }
})
