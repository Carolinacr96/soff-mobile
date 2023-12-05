import { LineChart } from 'react-native-chart-kit'
import { RoutesApi } from '../../../models/routes.models'
import React, {useEffect, useState, useMemo} from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function LineSales() {
  const [sales, setSales] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const fetchGetSales = async () => {
    const response = await fetch(`${RoutesApi.DASHBOARD}/grafic_sales`)
    const json = await response.json()
    setSales(json)
  }

  useEffect(()=>{
    fetchGetSales()
  }, [])

  const allMonths = useMemo(() => [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
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
      sales.filter((sale:any) => sale.Year === selectedYear)
      .forEach((sale:any) => {
        const monthIndex = allMonths.indexOf(sale.Month);
        filledData[monthIndex] = sale.Total_Sales;
      });
  
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
        <select
          id="yearSelector"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={styles.selectYear}
        >
          {Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </View>
    </View>
    <div>
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
    </div>
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

