import { Text, StyleSheet,View } from 'react-native'

export default function HeaderModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.title}>¡Aquí verás estadisticas rapidas del aplicativo!</Text>
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