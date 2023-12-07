import React, { useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet,  TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay';
import { getValidationErrors } from '../../utilities/get-validation-error'


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Correo invalido').required('Campo requerido'),
    password: Yup.string().required('Contraseña requerida')
})

const initialValues = {
    email: '',
    password: ''
}


export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, userInfo} = useContext(AuthContext)
    const [error, setError]= useState('')
    const [success, setSuccess] = useState(false)

    return (
        <View style={styles.fill} >
            <Spinner visible={isLoading} />
            <View style={styles.controls}>
                <Text style={styles.title}>!Hola, Bienvenido de Nuevo! 👋</Text>
                <Text style={styles.paragraph}>Es un placer tenerte de nuevo por acá, te deseo suerte con las ventas de hoy</Text>
            </View>
            <Formik 
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    const result = await login(values.email, values.password)
                    if(result != undefined && result.access_token != undefined){
                        setSuccess(true)
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
                            <Text style={styles.labels}>Contraseña</Text>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={true}
                                placeholder='Ingrese su contraseña'
                                placeholderTextColor='#7f7f7f'
                                value={values.password}
                                />
                            <Text style={styles.captions}>Ingrese su contraseña</Text>
                            {
                                errors.password && touched.password ? (
                                    <Text style={styles.validationField}>{errors.email}</Text>
                                ): null
                            }
                        </View>
                        <View style={styles.controlsRecover}>
                            <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
                                <Text style={{textAlign: 'right'}}>¿Has olvidado tu <Text style={{ marginLeft: 3,fontWeight: '600'}}>contraseña</Text>?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.buttons}>
                                <Text style={styles.button_text}>Iniciar sesión</Text>
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
