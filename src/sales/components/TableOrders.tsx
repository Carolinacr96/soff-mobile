'use client'
import React, {useState, useEffect} from "react"
import { RoutesApi } from "../../models/routes.models"
import { Text, View } from "react-native"
import HeaderModule from "./header-module/HeaderModule"

export default function Sales() {
    const [sales, setSales] = useState([])   
  
    const fetchGetSales = async () => {
      const response = await fetch(RoutesApi.SALES)
      const json = await response.json()
      setSales(json)
    }
  
      useEffect(()=>{
        fetchGetSales()
      }, [])

  return (
    <View>
      <HeaderModule/>
      {sales ? (Array.isArray(sales) && sales.map((sale) => (
        <View key={sale.id}>
            <Text>{sale.client}</Text>
            <Text>{sale.invoice_number}</Text>
            <Text>{sale.sale_date}</Text>
            <Text>{sale.amount_order}</Text>
            <Text>{sale.total}</Text>
        </View>
  )
  )):(<Text>Cargando información...</Text>)
  }
    </View>
  )
}
