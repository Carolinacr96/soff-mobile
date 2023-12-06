import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamListNotifications = {
 Bell: undefined;
 Notifications: undefined;
}

export type BellNavigationProp = StackNavigationProp<RootStackParamListNotifications, 'Bell'>;
export type NotificationsNavigationProp = StackNavigationProp<RootStackParamListNotifications, 'Notifications'>;