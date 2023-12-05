'use client'
import { Text, StyleSheet,View, ScrollView } from 'react-native'
import HeaderModule from '../header-module/HeaderModule'
import { Target } from '../targets/Target'
import LineSales from '../LineSales/LineSales'
export default function BoxDashboard() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <HeaderModule/>
      <View style={styles.box}>
        <Target/>
      </View>
  <LineSales/>
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
    // borderRadius:10,
    height:'auto',
    // borderWidth:1,
    // borderColor:"#687990", 
    marginBottom: 10,
    flexDirection:"row"
  },
  text:{
    fontSize: 12,
    fontWeight: 'bold',
    color:"gray"
  }
  
})