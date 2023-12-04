import { Text, View, StyleSheet } from 'react-native'

export default function HeaderModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compras</Text>
      <Text style={styles.text}>¡Aquí tienes una lista de todas las compras realizadas!</Text>
    </View>
  )
}
export  function HeaderModuleDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle</Text>
      <Text style={styles.text}>¡Aquí tienes una lista de todas las ordenes de la compra!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:320,
    height:100,
    marginTop:10
  },
  title:{
    fontWeight:'bold',
    fontSize:30
  },
  text:{
    color:"gray"
  }
})