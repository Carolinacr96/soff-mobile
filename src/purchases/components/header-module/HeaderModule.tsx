import { Text, View } from 'native-base'

export default function HeaderModule() {
  return (
    <View w="320"  h="100">
      <Text bold fontSize="3xl" >Compras</Text>
      <Text color="gray.500">¡Aquí tienes una lista de todas las compras realizadas!</Text>
    </View>
  )
}
export  function HeaderModuleDetail() {
  return (
    <View w="320"  h="100">
      <Text bold fontSize="3xl" >Detalle</Text>
      <Text color="gray.500">¡Aquí tienes una lista de todas las ordenes de la compra!</Text>
    </View>
  )
}