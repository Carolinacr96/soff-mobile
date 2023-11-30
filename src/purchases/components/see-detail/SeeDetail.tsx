import React, {useState, useEffect} from "react";
import { RoutesApi } from "../../../models/routes.models";
import { Text, Box, View, Center, NativeBaseProvider, Flex } from 'native-base';
import { HeaderModuleDetail } from "../header-module/HeaderModule";
import { RootStackParamList } from '../table-purchases/RootStackParamList';
import { RouteProp } from '@react-navigation/native';

type SeeDetailRouteProp = RouteProp<RootStackParamList, 'SeeDetail'>;
interface Props {
  route: SeeDetailRouteProp;
}

export const SeeDetail = ({route}:Props) => {
  const { id } = route.params;
  const [orders, setOrders] = useState([]);
 
  const fetchGetOrders = async () => {
    const orders = await fetch(`${RoutesApi.PURCHASES}/${id}/orders`);
    const json = await orders.json();
    setOrders(json);
  };

  useEffect(() => {
    fetchGetOrders();
  }, []);

  return (
    <View>
      <Center flex={1} >
        <HeaderModuleDetail/>
        {orders ? (Array.isArray(orders) && orders.map((order) => (
          <Box key={order.id_order} m="2" w="320" bg="white" rounded="md" h="55" borderWidth="1" borderColor="#687990" _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'black',
            letterSpacing: 'lg'
          }}>
            <Flex direction="row" h="58" justifyContent="space-between">
              <Flex direction="column" h="58" p="2" pt="2" marginLeft="15px">
                <Text bold color="gray.500" fontSize="xs">Insumo: {order.supply}</Text>
                <Text bold color="gray.500" fontSize="xs">Cantidad: {order.amount_supplies}</Text>
              </Flex>

              <Flex direction="column" h="58" p="2" pt="2" marginRight="20px">
                <Text bold color="gray.500" fontSize="xs">Precio: {order.price_supplies.toLocaleString('en-US')}</Text>
                <Text bold color="gray.500" fontSize="xs">Total: {order.subtotal.toLocaleString('en-US')}</Text>
              </Flex>
            </Flex>
          </Box>
        ))) : (<Text>Cargando información...</Text>)
        }
      </Center>
    </View>
  );
  };
