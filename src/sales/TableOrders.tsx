'use client'
import React, {useState, useEffect} from "react"
import { RoutesApi } from "../models/routes.models"
import useSWR from "swr"
import { Text, View } from "react-native"
import { Product } from "../models/productsModels"


const TableOrders = () => {
    const [active, setActive] = useState(true)
    const [products, setData] = useState([])
  //   const {data: products} = useSWR(`${RoutesApi.PRODUCTS}?status=${active}`)
  // console.log(products)

    // const [active, setActive] = useState(true)
   
  
    const fetchGetProducts = async () => {
      const response = await fetch(`${RoutesApi.PRODUCTS}?status=${active}`)
      const json = await response.json()
      setData(json)
    }
  
      useEffect(()=>{
        fetchGetProducts()
      }, [])

  return (
    <View>
      {products ? (Array.isArray(products) && products.map((product) => (
        <View key={product.id}>
            <Text>{product.name}</Text>
        </View>
  )
  )):(<Text>Cargando productos...</Text>)
  }
    </View>
  )
}

export default TableOrders