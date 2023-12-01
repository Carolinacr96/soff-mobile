import React, {useState, useEffect} from "react"
import { RoutesApi } from "../../models/routes.models"
import { HeaderModuleDetail } from "../components/header-module/HeaderModule"
import { RootStackParamListSales } from "../components/table-sales/RootStackParamList"
import { RouteProp } from '@react-navigation/native'
import { StyleSheet, View, Text } from "react-native"

type SeeDetailRouteProp = RouteProp<RootStackParamListSales, 'SeeDetailSale'>;
interface Props {
  route: SeeDetailRouteProp;
}

export const SeeDetailSale = ({route}:Props) => {
  const { id } = route.params;
  const [orders, setOrders] = useState([]);
 
  const fetchGetOrders = async () => {
    const orders = await fetch(`${RoutesApi.SALES}/${id}/orders`);
    const json = await orders.json();
    setOrders(json);
  };

  useEffect(() => {
    fetchGetOrders();
  }, []);

  return (
    <View style={styles.container}>
        <HeaderModuleDetail/>
        {orders ? (Array.isArray(orders) && orders.map((order) => (
          <View key={order.id} style={styles.box}>
              <View style={styles.flex}>
                <Text style={styles.text}>Producto: {order.product}</Text>
                <Text style={styles.text}>Cantidad: {order.amount_product}</Text>
              </View>

              <View style={styles.flex}>
                <Text style={styles.text}>Precio: ${order.price.toLocaleString('en-US')}</Text>
                <Text style={styles.text}>Total: ${order.total.toLocaleString('en-US')}</Text>
              </View>
            </View>
          ))) : (<Text>Cargando información...</Text>)
        }
    </View>
  )
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
    flexAll:{
      height:70,
      width:320
    },
    flex:{
      flexDirection:"column",
      width:200,
      padding:10
    },
    icon:{
      paddingTop: 25,
      padding:10,
      flexDirection:"column"
    }
  })
