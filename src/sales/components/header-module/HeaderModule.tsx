import { Text, View, StyleSheet } from 'react-native'

export default function HeaderModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas</Text>
      <Text style={styles.text}>¡Aquí tienes una lista de todas las ventas realizadas!</Text>
    </View>
  )
}

export  function HeaderModuleDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle</Text>
      <Text style={styles.text}>¡Aquí tienes una lista de todas las ordenes de la venta!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:320,
    height:100
  },
  title:{
    fontWeight:'bold',
    fontSize:30
  },
  text:{
    color:"gray"
  }
})