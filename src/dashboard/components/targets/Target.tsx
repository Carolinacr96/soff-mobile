import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RoutesApi } from "../../../models/routes.models"

export const Target = () => {
    const [targets, setTargets] = useState([])
    const fetchGetTargets = async () => {
        const response = await fetch(RoutesApi.DASHBOARD)
        const json = await response.json()
        setTargets(json)
        }

    interface Target {
        category: string,
        target: string,
        percentage: string,
        message: string
    }
    interface Props {
        target: Target
    }
    useEffect(()=>{
        fetchGetTargets()
      }, [])
 return (
    <View>
        {
            Array.isArray(targets) && targets.map((target) => (
                <View style={styles.card} key={target.percentage}>
                    <Text style={styles.description}>{target.category}</Text>
                    <Text style={styles.title}>{target.target}</Text>
                    <Text style={styles.description}>{target.message}</Text>
                </View>
            ))
        }
    </View>
 );
};

const styles = StyleSheet.create({
 card: {
   backgroundColor: '#fff',
   borderRadius: 10,
   borderWidth:1,
   borderColor:"#687990", 
   padding: 10,
   margin: 10,
   elevation: 2,
   width: '79%',
 },
 title: {
   fontSize: 14,
   fontWeight: 'bold',
 },
 description: {
   fontSize: 12,
 },
});
