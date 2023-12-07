import React, {useState, useEffect, useContext} from "react";
import { RoutesApi } from "../../../models/routesApi";
import { StyleSheet, View, Text,ScrollView } from "react-native"
import { HeaderModuleDetail } from "../../purchases/components/HeaderModule";
import { AuthContext } from "../../../context/AuthContext";

export const SeeDetailPurchase = ({route}) => {
  const { id } = route.params;
  const [orders, setOrders] = useState([]);
  const {userInfo} = useContext(AuthContext)


  const fetchGetOrders = async () => {
    const orders = await fetch(`${RoutesApi.PURCHASES}/${id}/orders`,{
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

  return (
    <ScrollView>
      <HeaderModuleDetail/>
      <View style={{paddingHorizontal: 15}}>
          {orders ? (Array.isArray(orders) && orders.map((order) => (
            <View key={order.id_order} style={styles.box}>
              <View style={styles.flex}>
                <Text style={styles.text}>Insumo: {order.supply}</Text>
                <Text style={styles.text}>Cantidad: {order.amount_supplies}</Text>
              </View>

                <View style={styles.flex}>
                  {/* <Text style={styles.text}>Precio: {order.price_supplies.toLocaleString('en-US')}</Text>
                  <Text style={styles.text}>Total: {order.subtotal.toLocaleString('en-US')}</Text> */}
                </View>
            </View>
          ))) : (<Text>Cargando información...</Text>)
          }
      </View>
    </ScrollView>
  );
  };

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
        paddingHorizontal:10
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