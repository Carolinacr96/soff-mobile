import Sales from "../sales/components/table-sales/TableOrders"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BoxPurchases } from "../purchases/components/table-purchases/BoxPurchases";
import { SeeDetail } from "../purchases/components/see-detail/SeeDetail";
import { createStackNavigator } from '@react-navigation/stack';
import HeaderModule from "../dashboard/components/header-module/HeaderModule";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ComprasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Compras" component={BoxPurchases}/>
      <Stack.Screen name="SeeDetail" component={SeeDetail} options={{ title: 'Detalle' }}/>
    </Stack.Navigator>
  );
 }

export default function Main() {
 return (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Dashboard') {
        iconName = focused
          ? 'home'
          : 'home-outline';
      } else if (route.name === 'Ventas') {
        iconName = focused
          ? 'cash'
          : 'cash-outline';
      } else if (route.name === 'Compras') {
        iconName = focused
          ? 'cart'
          : 'cart-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      backgroundColor: 'blue',
      width: '100%',
      height: 80, 
    },
    tabBarShowLabel: false,
  })}
  >
  <Tab.Screen name="Dashboard" component={HeaderModule} />
  <Tab.Screen name="Ventas" component={Sales} />
  <Tab.Screen name="Compras" component={ComprasStack} options={{ headerShown: false }}/>
  </Tab.Navigator>

 );
}



