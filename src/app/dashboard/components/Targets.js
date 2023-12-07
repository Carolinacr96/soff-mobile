import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {RoutesApi} from '../../../models/routesApi'
import { AuthContext } from '../../../context/AuthContext';

export const Target = () => {
    const [targets, setTargets] = useState([])
    const {userInfo} = useContext(AuthContext)
    
    const fetchGetTargets = async () => {
        const response = await fetch(RoutesApi.DASHBOARD, {
            headers: {
                'Authorization': `Bearer ${userInfo && userInfo.access_token}`
            }
        })
        const json = await response.json()
        setTargets(json)
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
   elevation: 2,
   width: '100%',
   marginBottom: 10
 },
 title: {
   fontSize: 14,
   fontWeight: 'bold',
 },
 description: {
   fontSize: 12,
 },
});