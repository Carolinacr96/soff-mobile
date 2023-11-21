'use client'
import React, {useState, useEffect} from "react"
import { RoutesApi } from "../../models/routes.models"
import { Text, View } from "react-native"
import HeaderModule from "./header-module/HeaderModule"


const TableOrders = () => {
    const [active, setActive] = useState(true)
    const [products, setData] = useState([])
  //   const {data: products} = useSWR(`${RoutesApi.PRODUCTS}?status=${active}`)
  // console.log(products)

    // const [active, setActive] = useState(true)
   
  
    const fetchGetProducts = async () => {
      const response = await fetch(RoutesApi.SALES)
      const json = await response.json()
      setData(json)
    }
  
      useEffect(()=>{
        fetchGetProducts()
      }, [])

  return (
    <View>
      <HeaderModule/>
      {products ? (Array.isArray(products) && products.map((product) => (
        <View key={product.id}>
            <Text>{product.client}</Text>
            <Text>{product.invoice_number}</Text>
            <Text>{product.sale_date}</Text>
            <Text>{product.amount_order}</Text>
            <Text>{product.total}</Text>
        </View>
  )
  )):(<Text>Cargando productos...</Text>)
  }
    </View>
  )
}

export default TableOrders