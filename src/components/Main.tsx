import { BoxSales } from '../sales/components/table-sales/BoxSales';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BoxPurchases } from "../purchases/components/table-purchases/BoxPurchases";
import { SeeDetail } from "../purchases/components/see-detail/SeeDetail";
import { SeeDetailSale } from '../sales/see-detail/SeeDetailSale';
import { createStackNavigator } from '@react-navigation/stack';
// import HeaderModule from "../dashboard/components/header-module/HeaderModule";
import BoxDashboard from '../dashboard/components/table-dashboard/BoxDashboard';
import FormLogin from '../auth/login/components/form/FormLogin'
import FormRecovery from '../auth/recovery-password/components/form-recovery/FormRecovery'
import FormConfirm from '../auth/confirm-recover/components/form-confirm/FormConfirm'


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

 function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={FormLogin}/>
    </Stack.Navigator>
  );
 }

 function ConfirmStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Confirm" component={FormConfirm}/>
    </Stack.Navigator>
  );
 }

 function RecoveryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recovery" component={FormRecovery}/>
    </Stack.Navigator>
  );
 }

 function SaleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ventas" component={BoxSales}/>
      <Stack.Screen name="SeeDetailSale" component={SeeDetailSale} options={{ title: 'Detalle' }}/>
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
      } else if (route.name === 'Login'){
        iconName = focused
          ? 'cart'
          : 'cart-outline';
      } else if (route.name === 'Recovery'){
        iconName = focused
          ? 'cart'
          : 'cart-outline';
      } else if (route.name === 'Confirm'){
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
  <Tab.Screen name="Dashboard" component={BoxDashboard} />
  <Tab.Screen name="Ventas" component={SaleStack} options={{ headerShown: false }} />
  <Tab.Screen name="Compras" component={ComprasStack} options={{ headerShown: false }}/>
  <Tab.Screen name="Login" component={LoginStack} options={{ headerShown: false }}/>
  <Tab.Screen name="Recovery" component={RecoveryStack} options={{ headerShown: false }}/>
  <Tab.Screen name="Confirm" component={ConfirmStack} options={{ headerShown: false }}/>
  </Tab.Navigator>

 );
}



