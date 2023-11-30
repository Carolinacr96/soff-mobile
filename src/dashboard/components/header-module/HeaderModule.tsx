import { Text, Center,View } from 'native-base'

export default function HeaderModule() {
  return (
    <View w="320"  h="100">
        <Center flex={1} >
            <Text bold fontSize="3xl" >Dashboard</Text>
            <Text fontSize="s" color="gray.500">¡Aquí estadisticas rapidas del aplicativo!</Text>
        </Center>
    </View>
  )
}