import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../app/login/Login";
import Sales from "../app/sales/Sales"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Splash from "../app/splash/Splash";
import RecoverPassword from "../app/recover-password/RecoverPassword"
import ConfirmCode from "../app/confirm-code/ConfirmCode";
import ChangePassword from "../app/change-password/ChangePassword";
import { BoxSales } from "../app/sales/components/BoxSales";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ChartPieIcon, BanknotesIcon, Cog6ToothIcon,  LockClosedIcon, ArrowLongRightIcon, ChevronDownIcon,BriefcaseIcon, UserGroupIcon, SwatchIcon, ShoppingBagIcon, CakeIcon} from '@heroicons/react/24/outline'
import Icon from 'react-native-vector-icons/Ionicons';
import { SeeDetailSale } from "../app/sales/SaleDetail";
import { BoxPurchases } from "../app/purchases/Purchases";
import { SeeDetailPurchase } from "../app/purchases/components/SeeDetail";
import { Notifications } from "../app/notifications/Notifications";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function NavigationTabs() {
    return (
    <Tab.Navigator
    initialRouteName="Ventas"
    screenOptions={({ route }) => ({
        
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Ventas') {
                iconName = focused
                    ? 'ios-cash'
                    : 'ios-cash-outline';
                } else if (route.name === 'Compras') {
                    iconName = focused ? 'ios-cart' : 'ios-cart-outline';
                } else if (route.name === 'Notificaciones'){
                    iconName = focused ? 'ios-notifications' : 'notifications-outline';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
            },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: 'gray',
    })}
    >
        <Tab.Screen
            name="Ventas"
            component={BoxSales}
         
        />
        <Tab.Screen
            name="Compras"
            component={BoxPurchases}
        />
         <Tab.Screen
            name="Notificaciones"
            component={Notifications}
        />
        {/* <Tab.Screen name="Compras" component={Sales} options={{headerTitle: 'Compras'}}/> */}
    </Tab.Navigator>
    )
}

export default function Navigation() {
    const {userInfo, splashIsLoadingSession} = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator>
            {
                splashIsLoadingSession ? (
                    <Stack.Screen name="Splash Screen" component={Splash} options={{headerShown: false}}/>
                ): userInfo && userInfo.access_token? 
                (
                    <>
                        <Stack.Screen name="SalesBox" component={NavigationTabs} options={{headerShown: false}} />
                        <Stack.Screen name="SeeDetailSale" component={SeeDetailSale} options={{headerShown: true, headerTitle: "Detalle de venta"}}/>
                        <Stack.Screen name="SeeDetailPurchase" component={SeeDetailPurchase} options={{headerShown: true,headerTitle:"Detalle de compra"}}/>
                    </>
                ): 
                (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}}/>
                        <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{headerShown: false}} />
                        <Stack.Screen name="ConfirmCode" component={ConfirmCode} options={{headerShown: false}}/>
                    </>
                )
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}