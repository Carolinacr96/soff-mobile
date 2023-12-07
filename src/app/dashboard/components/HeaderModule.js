import { Text, StyleSheet,View } from 'react-native'

export default function HeaderModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>¡Aquí verás estadisticas rapidas del aplicativo!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding:15
      },
  title:{
    fontWeight:'bold',
    fontSize:30
  },
  text:{
    color:"gray"
  }
})