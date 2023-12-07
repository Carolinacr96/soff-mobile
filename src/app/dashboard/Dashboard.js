import { Text, StyleSheet,View, ScrollView } from 'react-native'
import HeaderModule from './components/HeaderModule'
import { Target } from './components/Targets'
import LineSales from './components/LineSale'
import ChartSale from './components/ChartSale'


export default function Dashboard() {
  return (
    <ScrollView>
    <HeaderModule/>
      <View style={{paddingHorizontal: 15, marginBottom: 15}}>
        <View >
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