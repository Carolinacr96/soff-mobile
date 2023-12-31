import { LineChart } from 'react-native-chart-kit'
import { RoutesApi } from '../../../models/routesApi'
import React, {useEffect, useState, useMemo, useContext} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../../context/AuthContext';


export default function LineSales() {
  const [sales, setSales] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const {userInfo} = useContext(AuthContext)

  const fetchGetSales = async () => {
    const response = await fetch(`${RoutesApi.DASHBOARD}/grafic_sales`, {
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

  const allMonths = useMemo(() => [
    'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.',
    'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'
  ], []);

  const [chartData, setChartData] = useState({
    labels:allMonths,
    datasets: [{
      data:Array(allMonths.length).fill(0),
    }]
  })

  useEffect(()=>{
    if(sales){
      const filledData = Array(allMonths.length).fill(0);
      sales.filter((sale) => sale.Year === selectedYear)
      .forEach((sale) => {
        const monthIndex = allMonths.indexOf(sale.Month);
        filledData[monthIndex] = sale.Total_Sales})
  
      setChartData({
        labels: allMonths,
        datasets: [{
          data: filledData,
        }]
      });
    }
  }, [sales, allMonths, selectedYear]);
  return(
    <View style={styles.container}>
    <View style={styles.title}>
      <View>
        <Text style={styles.text}>Total Ventas {selectedYear}</Text>
      </View>
      <View style={styles.select}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={((e) => setSelectedYear(Number(e)))}
          style={styles.selectYear}
        >
          {Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index).map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>
    </View>
    <View>
    <LineChart
      data={chartData}
      width={350}
      height={230}
      yAxisLabel=" $"
      verticalLabelRotation={-40}
      chartConfig={{
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(2, 17, 252, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
    />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop:20
  },
  title:{
    flexDirection:'row',
    marginBottom:20,
    alignItems: 'center',
  },
  text:{
    color:'gray',
    fontWeight:'bold'
  },
  select:{
    marginLeft:120,
  },
  selectYear:{
    color:'blue',
    padding:2,
    paddingRight:10,
    borderRadius:7
  }
})