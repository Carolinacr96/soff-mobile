import React, {useState, useEffect, useContext} from "react"
import { RoutesApi } from "../../../models/routesApi";
import HeaderModule from "./HeaderModule";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../context/AuthContext";


export const BoxSales = ({navigation}) => {
  const [sales, setSales] = useState([])
  const [searchData, setSearchData] = useState("")   
  const {userInfo} = useContext(AuthContext)
  const handleSaleClick = (id) => {
    navigation.navigate('SeeDetailSale', { id });
   };

  const fetchGetSales = async () => {
    const response = await fetch(RoutesApi.SALES, {
        headers: {
            'Authorization': `Bearer ${userInfo && userInfo.access_token}`
        }
    })
    const json = await response.json()
    setSales(json)
  }

  useEffect(()=>{
    fetchGetSales()
  }, [])

  const search = (text)=>{
    setSearchData(text)
  }

  const filterSales = sales && sales.filter((sale) =>
    sale.invoice_number.toLowerCase().includes(searchData.toLowerCase())
  );

  return <ScrollView>
  <View>
    <HeaderModule/>
    <View style={styles.controls}>
        <TextInput
        placeholder="Buscar número de factura..."
        value={searchData}
        onChangeText={(value) => search(value)}
        style={styles.inputs}
        />
    </View>
    {
      sales && sales.length === 0 ? (
        <Text>No se encontraron resultados</Text>
      ):(
        filterSales && filterSales.length === 0 ? (
            <Text>No se encontró {searchData}</Text>
          ):(
            filterSales && filterSales.map((sale) => (
              <TouchableOpacity key={sale.id} onPress={() => handleSaleClick(sale.id)} style={{paddingHorizontal: 15}}>
                <View style={styles.box}>
                  <View style={styles.flex1}>
                    <Text style={styles.text}>Cliente: {sale.client}</Text>
                    <Text style={styles.text}>Factura: {sale.invoice_number}</Text>
                    {/* <Text style={styles.text}>Fecha: {format(new Date(sale.sale_date), 'dd-MM-yyyy').replace(/-/g, '/')}</Text> */}
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.text}>Ordenes: {sale.amount_order}</Text>
                    {/* <Text style={styles.text}>Total: ${sale.total.toLocaleString('en-US')}</Text> */}
                  </View>
                  <View style={styles.icon}>
                    {/* <Ionicons name="ios-arrow-forward" size={18} color="gray" marginRight="10px"/> */}
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
    controls: {
        marginHorizontal: 15,
        marginTop: 10
    },
  box :{
    margin:2,
    width:'100%',
    backgroundColor:"white",
    borderRadius:10,
    height:'auto',
    borderWidth:1,
    borderColor:"#687990", 
    marginBottom: 10,
    flexDirection:"row",
    
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
  inputs: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginVertical: 4,
    borderColor: '#bbb',
    marginBottom:10,
    backgroundColor: '#ffffff'
},
fill: {
    backgroundColor: 'white',
    height: '100%',
},
})