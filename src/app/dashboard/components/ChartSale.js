import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { RoutesApi } from '../../../models/routesApi';
import { AuthContext } from '../../../context/AuthContext';

export default function ChartSale() {
 const [sales, setSales] = useState([]);
 const {userInfo} = useContext(AuthContext)

 const fetchSalesChart = async () => {
    const response = await fetch(`${RoutesApi.DASHBOARD}/grafic_payment`, {
        headers: {
            'Authorization': `Bearer ${userInfo && userInfo.access_token}`
        }
    });
  const json = await response.json();
  setSales(json);
 };

 const cashSales = sales && sales.reduce((total, item) => total + item.Ventas_Efectivo, 0);
 const transferSales = sales && sales.reduce((total, item) => total + item.Ventas_Transferencia, 0);
 const totalSales = cashSales + transferSales;
 const porcash = sales && sales.map((item) => item.Porcentaje_Efectivo);
 const portransfer = sales && sales.map((item) => item.Porcentaje_Transferencia);

 useEffect(() => {
  fetchSalesChart();
 }, []);


const data = [
    {
     name: "",
     population: cashSales,
     percentage: porcash,
     color: "rgba(131, 167, 234, 1)",
     legendFontColor: "black",
     legendFontSize: 15
    },
    {
     name: "",
     population: transferSales,
     percentage: portransfer,
     color: "#F00",
     legendFontColor: "black",
     legendFontSize: 15
    }
   ];
   


  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    withInnerLabels: false, 
  };

 return (
    <View style={styles.container}>
        <View>
            <Text style={styles.text}>Método de pago ventas</Text>
        </View>
        <PieChart
            data={data}
            width={300}
            height={230}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[5, 5]}
        />
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor:"green"}} />
                <Text style={styles.text}> Total: {totalSales.toLocaleString('en-US')}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor:"rgba(131, 167, 234, 1)"}} />
                <Text style={styles.text}> Efectivo: {cashSales.toLocaleString('en-US')} ({porcash}%)</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor:"#F00"}} />
                <Text style={styles.text}> Transferencia: {transferSales.toLocaleString('en-US')} ({portransfer}%)</Text>
            </View>
        </View>
    </View>

 );
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop:20
    },
    text:{
      color:'gray',
      fontWeight:'bold'
    }
  })