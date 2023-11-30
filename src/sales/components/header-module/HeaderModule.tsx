import { Text, View } from 'native-base'

export default function HeaderModule() {
  return (
    <View w="320"  h="100">
      <Text bold fontSize="3xl" >Ventas</Text>
      <Text color="gray.500">¡Aquí tienes una lista de todas las ventas realizadas!</Text>
    </View>
  )
}