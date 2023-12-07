import React, {useContext, useState} from 'react'
import { View, Text, TextInput, StyleSheet,  TouchableOpacity } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getValidationErrors } from '../../utilities/get-validation-error'
import BouncyCheckbox from "react-native-bouncy-checkbox";


const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Campo requerido'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Campo requerido')
})

const initialValues = {
  password: '',
  confirmPassword: ''
}

export default function ChangePassword({navigation}) {
    const {changePassword} = useContext(AuthContext)
    const [error, setError]= useState('')
    const [success, setSuccess] = useState(false)
    const [securityPassword, setSecurityPassword] = useState(true)


  return (
    <View style={styles.fill}>
        <View style={styles.controls}>
            <Text style={styles.title}>¡ya estamos aquí! 💎</Text>
            <Text style={styles.paragraph}>Ingresa la nueva contraseña para tu cuenta y no se te olvide verificarla.</Text>
        </View>
        <Formik 
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    const apikey = await AsyncStorage.getItem('apikey')
                    console.log(apikey)
                    const result = await changePassword(apikey, values.password)
                    console.log(result)
                    if(result != undefined && result.id != undefined){
                        setSuccess(true)
                        navigation.navigate("Login")
                    }else{
                        setError(result.detail)
                    }

                }}
            >
                {({handleBlur, handleChange, handleSubmit, values, errors, touched}) => (
                    <View>
                        <View style={error ? styles.controls: {display:'none'}}>
                            <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>{getValidationErrors(error) ? getValidationErrors(error).message : ''}</Text>
                        </View>
                        <View style={success === true ? styles.controls : {display:'none'}}>
                            <Text style={{color: 'green', fontSize: 12}}>{success ? 'Se ha confirmado el codigo correctamente!': ''}</Text>
                        </View>
                        <View style={styles.controls}>
                            <Text style={styles.labels}>Contraseña</Text>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder='Ingrese su nueva contraseña'
                                placeholderTextColor='#7f7f7f'
                                secureTextEntry={securityPassword}
                                value={values.password}
                                />
                            <Text style={styles.captions}>Ingrese su nueva contraseña</Text>
                            {
                                errors.password && touched.password ? (
                                    <Text style={styles.validationField}>{errors.password}</Text>
                                ): null
                            }
                        </View>
                        <View style={styles.controls}>
                            <Text style={styles.labels}>Confirmar Contraseña</Text>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                placeholder='Verifique su nueva contraseña'
                                placeholderTextColor='#7f7f7f'
                                secureTextEntry={securityPassword}
                                value={values.confirmPassword}
                                />
                            <Text style={styles.captions}>Verifique su nueva contraseña</Text>
                            {
                                errors.confirmPassword && touched.confirmPassword ? (
                                    <Text style={styles.validationField}>{errors.confirmPassword}</Text>
                                ): null
                            }
                        </View>
                        <View style={styles.controlsCheck}>
                        <BouncyCheckbox
                            size={17}
                            isChecked={securityPassword}
                            fillColor="#2563eb"
                            unfillColor="white"
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 1, borderRadius: 4}}
                            onPress={(isChecked) => {
                                setSecurityPassword(isChecked)
                            }}
                            />
                            <Text>Mostrar contraseñas</Text>
                        </View>
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.buttons}>
                                <Text style={styles.button_text}>Cambiar contraseña</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.controlsRecover}>
                            <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
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
  },
  controlsCheck: {
    marginHorizontal: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row'
  }
})

