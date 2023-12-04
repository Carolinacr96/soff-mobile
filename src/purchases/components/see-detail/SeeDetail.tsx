import React, {useState, useEffect} from "react";
import { RoutesApi } from "../../../models/routes.models";
import { StyleSheet, View, Text } from "react-native"
import { HeaderModuleDetail } from "../header-module/HeaderModule";
import { RootStackParamList } from '../table-purchases/RootStackParamList';
import { RouteProp } from '@react-navigation/native';

type SeeDetailRouteProp = RouteProp<RootStackParamList, 'SeeDetail'>;
interface Props {
  route: SeeDetailRouteProp;
}

export const SeeDetail = ({route}:Props) => {
  const { id } = route.params;
  const [orders, setOrders] = useState([]);
 
  const fetchGetOrders = async () => {
    const orders = await fetch(`${RoutesApi.PURCHASES}/${id}/orders`);
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
          <View key={order.id_order} style={styles.box}>
            <View style={styles.flex}>
              <Text style={styles.text}>Insumo: {order.supply}</Text>
              <Text style={styles.text}>Cantidad: {order.amount_supplies}</Text>
            </View>

              <View style={styles.flex}>
                <Text style={styles.text}>Precio: {order.price_supplies.toLocaleString('en-US')}</Text>
                <Text style={styles.text}>Total: {order.subtotal.toLocaleString('en-US')}</Text>
              </View>
          </View>
        ))) : (<Text>Cargando información...</Text>)
        }
    </View>
  );
  };

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
