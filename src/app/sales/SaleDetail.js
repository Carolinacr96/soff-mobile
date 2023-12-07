import React, {useState, useEffect, useContext} from "react"
import { RoutesApi } from "../../models/routesApi";
import { HeaderModuleDetail } from "./components/HeaderModule"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { AuthContext } from "../../context/AuthContext";

export const SeeDetailSale = ({route}) => {
  const { id } = route.params;
  const [orders, setOrders] = useState([]);
  const {userInfo} = useContext(AuthContext)
 
  const fetchGetOrders = async () => {
    const orders = await fetch(`${RoutesApi.SALES}/${id}/orders`, {
        headers: {
            'Authorization': `Bearer ${userInfo && userInfo.access_token}`
        }
    });
    const json = await orders.json();
    setOrders(json);
  };

  useEffect(() => {
    fetchGetOrders();
  }, []);

  return (<ScrollView>

  
      <HeaderModuleDetail/>
      <View  style={{paddingHorizontal: 15}}>
          {orders ? (Array.isArray(orders) && orders.map((order) => (
            <View key={order.id} style={styles.box}>
                <View style={styles.flex}>
                  <Text style={styles.text}>Producto: {order.product}</Text>
                  <Text style={styles.text}>Cantidad: {order.amount_product}</Text>
                </View>

                <View style={styles.flex}>
                  {/* <Text style={styles.text}>Precio: ${order.price.toLocaleString('en-US')}</Text>
                  <Text style={styles.text}>Total: ${order.total.toLocaleString('en-US')}</Text> */}
                </View>
              </View>
            ))) : (<Text>Cargando información...</Text>)
          }
      </View>
    </ScrollView>
  )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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