import axios from "axios"

export const AxiosInterceptors = () => {
    axios.interceptors.request.use((request) => { 
        console.log("ESTAMOS ENVIANDO ALGOOOOOr")
        return request
    });

    axios.interceptors.response.use(
        (response) => {
            console.log("TODO ESTÁ BIEN POR AQUÍ")
            return response
        },
        (error) => {
            if(error.response === undefined){
               console.log("ERROR ALGO QUE NO SE")

                // toast({variant: "destructive", title: getValidationErrors(error.code).title, description: getValidationErrors(error.code).message})
            }else {
                console.log("ERROR POR ALGO")
          
                // toast({variant: "destructive", title: getValidationErrors(error.response.data.detail).title, description: getValidationErrors(error.response.data.detail).message})
            }
            return Promise.reject(error)
        }
    )
}