import { SWRConfig } from "swr";
import axios from "axios";
import { AxiosInterceptors } from "../interceptors/axios-interceptor";
const fetcher = (url) => axios.get(url, {
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH"
}}).then(res => res.data)


export async function fetcherPost(url, arg, options){
    return axios.post(url, arg, options).then(res => res.data).catch((error) => console.log(error.response.data))
}


export default function SwrProvider ({children}) {
    AxiosInterceptors()
    return (
        <SWRConfig
            value={{
                fetcher: fetcher
            }}
        >
            {children}
        </SWRConfig>
    )
}