'use client'
import { Text, StyleSheet,View, ScrollView } from 'react-native'
import HeaderModule from '../header-module/HeaderModule'
import { Target } from '../targets/Target'
import LineSales from '../LineSales/LineSales'
import ChartSale from '../chart-sales/ChartSale'

export default function BoxDashboard() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderModule/>
        <View style={styles.box}>
          <Target/>
        </View>
        <LineSales/>
        <ChartSale/>
      </View>
    </ScrollView>
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
    height:'auto',
    marginBottom: 10,
    flexDirection:"row"
  },
  text:{
    fontSize: 12,
    fontWeight: 'bold',
    color:"gray"
  }
  
})