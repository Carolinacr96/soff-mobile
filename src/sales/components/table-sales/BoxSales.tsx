'use client'
import React, {useState, useEffect} from "react"
import { useNavigation } from '@react-navigation/native';
import { BoxSalesNavigationProp } from "./RootStackParamList";
import { RoutesApi } from "../../../models/routes.models"
import HeaderModule from "../header-module/HeaderModule";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

export const BoxSales = () => {
  const [sales, setSales] = useState([])
  const [searchData, setSearchData] = useState("")   
  const navigation = useNavigation<BoxSalesNavigationProp>();

  const handleSaleClick = (id: string) => {
    navigation.navigate('SeeDetailSale', { id });
   };

  const fetchGetSales = async () => {
    const response = await fetch(RoutesApi.SALES)
    const json = await response.json()
    setSales(json)
  }

  useEffect(()=>{
    fetchGetSales()
  }, [])

  const search = (text: string)=>{
    setSearchData(text)
  }

  const filterSales = sales.filter((sale) =>
    sale.invoice_number.toLowerCase().includes(searchData.toLowerCase())
  );

  return <ScrollView>
  <View style={styles.container}>
    <HeaderModule/>
    <TextInput
      placeholder="Buscar número de factura..."
      value={searchData}
      onChangeText={search}
      style={styles.input}
    />
    {
      sales.length === 0 ? (
        <Text>No se encontraron resultados</Text>
      ):(
          filterSales.length === 0 ? (
            <Text>No se encontró <strong>{searchData}</strong></Text>
          ):(
            filterSales.map((sale) => (
              <TouchableOpacity onPress={() => handleSaleClick(sale.id)}>
                <View key={sale.id} style={styles.box}>
                  <View style={styles.flex1}>
                    <Text style={styles.text}>Cliente: {sale.client}</Text>
                    <Text style={styles.text}>Factura: {sale.invoice_number}</Text>
                    <Text style={styles.text}>Fecha: {format(new Date(sale.sale_date), 'dd-MM-yyyy').replace(/-/g, '/')}</Text>
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.text}>Ordenes: {sale.amount_order}</Text>
                    <Text style={styles.text}>Total: ${sale.total.toLocaleString('en-US')}</Text>
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
  </View>
</ScrollView>
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
    margin:10,
    width:160
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