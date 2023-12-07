import React, {useContext, useState} from 'react'
import { View, Text, TextInput, StyleSheet,  TouchableOpacity } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getValidationErrors } from '../../utilities/get-validation-error'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Correo invalido').required('Campo requerido')
})

const initialValues = {
  email: ''
}

export default function RecoverPassword({navigation}) {
    const {recoverPassword} = useContext(AuthContext)
    const [resultss, setResultss] = useState({})
    const [error, setError]= useState('')
    const [success, setSuccess] = useState(false)
  return (
    <View style={styles.fill}>
        {/* <Spinner visible={isLoading} /> */}
        <View style={styles.controls}>
            <Text style={styles.title}>¡Hey! Vamos a recuperar tu contraseña 🔐</Text>
            <Text style={styles.paragraph}>Ingresa tu correo electrónico y te ayudaremos a recuperar tu contraseña en un abrir y cerrar de ojos.</Text>
        </View>
        <Formik 
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    const result = await recoverPassword(values.email)
                    if(result != undefined && result.id != undefined){
                        AsyncStorage.setItem('email', values.email)
                        setSuccess(true)
                        navigation.navigate("ConfirmCode")
                    }else{
                        setError(result.detail)
                    }
                    setResultss(result)

                }}
            >
                {({handleBlur, handleChange, handleSubmit, values, errors, touched}) => (
                    <View>
                        <View style={error ? styles.controls: {display:'none'}}>
                            <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>{getValidationErrors(error) ? getValidationErrors(error).message : ''}</Text>
                        </View>
                        <View style={success === true ? styles.controls : {display:'none'}}>
                            <Text style={{color: 'green', fontSize: 12}}>{success ? 'Hemos enviado un codigo de confirmación a tu correo electrónico': ''}</Text>
                        </View>
                        <View style={styles.controls}>
                            <Text style={styles.labels}>Correo Electrónico</Text>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder='example@example.com'
                                placeholderTextColor='#7f7f7f'
                                value={values.email}
                                />
                            <Text style={styles.captions}>Ingrese su correo electronico</Text>
                            {
                                errors.email && touched.email ? (
                                    <Text style={styles.validationField}>{errors.email}</Text>
                                ): null
                            }
                        </View>
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.buttons}>
                                <Text style={styles.button_text}>Enviar código</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.controlsRecover}>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={{textAlign: 'center'}}>¡Ya me acuerdo! <Text style={{ marginLeft: 3,fontWeight: '600'}}>Iniciar sesión</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  inputs: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderRadius: 4,
      marginVertical: 4,
      borderColor: '#bbb'
  },
  labels: {
      
  },
  captions: {
      fontSize: 12,
      color: '#7f7f7f'
  },
  controls: {
      marginHorizontal: 20,
      marginTop: 20
  },
  controlsRecover: {
      marginHorizontal: 20,
      marginTop: 20,
      display: 'flex'
  },
  fill: {
      backgroundColor: 'white',
      height: '100%',
      paddingTop: 50,
  },
  validationField: {
      color: 'red',
      fontSize: 13,
      fontStyle: 'italic'
  },
  buttons: {
      backgroundColor: '#2563eb',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
  },
  button_text: {
      color: 'white'
  },
  title: {
      fontSize: 21,
      fontWeight: '600',
      textAlign: 'center'
  },
  paragraph: {
      color: '#7f7f7f',
      textAlign: 'center',
      marginHorizontal: 'auto',
      marginTop: 5
  }
})

