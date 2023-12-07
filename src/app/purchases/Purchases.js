import React, {useState, useEffect, useContext} from "react"
import { RoutesApi } from "../../models/routesApi";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import HeaderModule from "./components/HeaderModule";
import { AuthContext } from "../../context/AuthContext";

export const BoxPurchases = ({navigation}) => {
  const [purchases, setPurchases] = useState([])  
  const [searchData, setSearchData] = useState("")  
  const {userInfo} = useContext(AuthContext)
  
  const handlePurchaseClick = (id) => {
    navigation.navigate('SeeDetailPurchase', { id });
   };

  const fetchGetPurchases = async () => {
    const response = await fetch(RoutesApi.PURCHASES, {
        headers: {
            'Authorization': `Bearer ${userInfo && userInfo.access_token}`
        }
    })
    const json = await response.json()
    setPurchases(json)
  }

  useEffect(()=>{
    fetchGetPurchases()
  }, [])

  const search = (text)=>{
    setSearchData(text)
  }

  const filterPurchases = purchases && purchases.filter((purchase) =>
    purchase.provider.toLowerCase().includes(searchData.toLowerCase())
  );
  

  return <ScrollView>
  <View >
      <HeaderModule/>
      <View style={styles.controls}> 
        <TextInput
          placeholder="Buscar por proveedor..."
          value={searchData}
          onChangeText={search}
          style={styles.inputs}
        />
      </View>
    {
      purchases && purchases.length === 0 ? (
        <View style={styles.controls}>
          <Text>No se encontraron resultados</Text>
        </View>
      ):(
        filterPurchases && filterPurchases.length === 0 ? (
          <View style={styles.controls}>
            <Text>No se encontró {searchData}</Text>
          </View>
          ):(
            filterPurchases && filterPurchases.map((purchase) => (
              <TouchableOpacity key={purchase.id} onPress={() => handlePurchaseClick(purchase.id)} style={{paddingHorizontal: 15}}>
                <View style={styles.box}>
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