import { RouteProp } from '@react-navigation/native'
import { RootStackParamListNotifications } from '../RootStackParamListNotifications';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RoutesApi } from '../../../../models/routes.models';
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';

export const Notifications = () => {
  const [suplies, setSuplies] = useState([])
  
  const fetchGetSupplies = async () => {
      const response = await fetch(RoutesApi.SUPPLIES)
      const json = await response.json()
      setSuplies(json)
    }
  
    useEffect(()=>{
      fetchGetSupplies()
    }, [])

    console.log(suplies)
    return <ScrollView>
    <View style={styles.container}>
      {
        suplies.map((supply) => {
          if (
            supply.quantity_stock <= 5000 &&
            supply.quantity_stock > 0 &&
            supply.unit_measure === 'Gramos' &&
            supply.status
          ) {
            return (
              <View key={supply.id} style={styles.box}>
                <Ionicons name='alert-circle-outline' size={24} color='yellow' />
                <View style={styles.flex}>
                  <Text style={styles.text}>{supply.name}:</Text>
                  <Text>Este insumo está cerca de terminarse. Quedan {supply.quantity_stock} gr</Text>
                </View>
              </View>
            );
          } if (
            supply.quantity_stock <= 40 &&
            supply.quantity_stock > 0 &&
            supply.unit_measure === 'Unidades' &&
            supply.status
          ) {
            return (
              <View key={supply.id} style={styles.box}>
                <Ionicons name='alert-circle-outline' size={24} color='yellow' />
                <View style={styles.flex}>
                  <Text style={styles.text}>{supply.name}:</Text> 
                  <Text>Este insumo está cerca de terminarse. Quedan {supply.quantity_stock} unidades</Text>
                </View>
              </View>
            );
          } if (supply.quantity_stock === 0 && supply.status) {
            return (
              <View key={supply.id} style={styles.box}>
                <Ionicons name='remove-circle-outline' size={24} color='red' />
                <View style={styles.flex}>
                  <Text style={styles.text}>{supply.name}:</Text> 
                  <Text>Este insumo no está disponible, recuerda comprar.</Text>
                </View>
              </View>
            );
          }
        })
      }
    </View>
  </ScrollView>
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding:10
    },
    box :{
      padding:10,
      width:'100%',
      height:'auto',
      paddingBottom: 10,
      flexDirection:"row"
    },
    text:{
      fontSize: 12,
      fontWeight: 'bold',
    },
    flex:{
      width:'100%',
      paddingLeft:10,
      paddingRight:20
    }
  })