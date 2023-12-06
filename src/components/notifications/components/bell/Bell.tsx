import { RoutesApi } from '../../../../models/routes.models';
import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { BellNavigationProp, NotificationsNavigationProp } from '../RootStackParamListNotifications';
import { RootStackParamListNotifications } from '../RootStackParamListNotifications';

// type BellRouteProp = RouteProp<RootStackParamListNotifications, 'Notificaciones'>;

export default function Bell(){
    // const navigation = useNavigation();
    const navigation = useNavigation<NotificationsNavigationProp>();

    const handleNotificationsClick = () => {
        console.log('Clic en el icono de la campana'); // Agrega este log para depuración
        navigation.navigate('Notifications');
       };

      return(
        <View>
            <TouchableOpacity onPress={handleNotificationsClick}>
                <Ionicons name="ios-notifications-outline" size={25} color="gray" marginRight="10px"/>
            </TouchableOpacity>
        </View>
      )
}