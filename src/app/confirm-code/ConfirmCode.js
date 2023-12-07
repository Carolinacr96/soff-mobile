import React, {useContext, useState} from 'react'
import { View, Text, TextInput, StyleSheet,  TouchableOpacity } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getValidationErrors } from '../../utilities/get-validation-error'

const LoginSchema = Yup.object().shape({
  code: Yup.string().required('Campo requerido')
})

const initialValues = {
  code: ''
}

export default function ConfirmCode({navigation}) {
    const {confirmCode} = useContext(AuthContext)
    const [resultss, setResultss] = useState({})
    const [error, setError]= useState('')
    const [success, setSuccess] = useState(false)
  return (
    <View style={styles.fill}>
        {/* <Spinner visible={isLoading} /> */}
        <View style={styles.controls}>
            <Text style={styles.title}>¡ya falta poco! 💫</Text>
            <Text style={styles.paragraph}>Hemos enviado un código de verificación al correo asociado a tu cuenta.</Text>
        </View>
        <Formik 
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    const email = await AsyncStorage.getItem('email')
                    const result = await confirmCode(values.code, email)
                    if(result != undefined && result.id != undefined){
                        console.log(result)
                        AsyncStorage.setItem('apikey', result.apikey)
                        setSuccess(true)
                        navigation.navigate("ChangePassword")
                    }else{
                        setError(result.detail)
                    }

                }}
            >
                {({handleBlur, handleChange, handleSubmit, values, errors, touched}) => (
                    <View>
                        <View style={styles.controls}>
                            <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>{getValidationErrors(error) ? getValidationErrors(error).message : ''}</Text>
                        </View>
                        <View style={styles.controls}>
                            <Text style={{color: 'green', fontSize: 12}}>{success ? 'Se ha confirmado el codigo correctamente!': ''}</Text>
                        </View>
                        <View style={styles.controls}>
                            <Text style={styles.labels}>Código de confirmación</Text>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                placeholder='XXXXXX'
                                placeholderTextColor='#7f7f7f'
                                value={values.code}
                                />
                            <Text style={styles.captions}>Ingrese el código que le enviamos</Text>
                            {
                                errors.code && touched.code ? (
                                    <Text style={styles.validationField}>{errors.code}</Text>
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
                                <Text style={{textAlign: 'center'}}>¡No me ha llegado un código! <Text style={{ marginLeft: 3,fontWeight: '600'}}>Volver a intentar</Text></Text>
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

