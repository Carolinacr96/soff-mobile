import React from "react";
import {
    Center,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Text,
} from "native-base";





const Login = () => {
    const [formData, setData] = React.useState({});
    const [password , setPassword] = React.useState('')
    const [errors, setErrors] = React.useState({})






    return (
        <Center w="100%" h="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                size="3xl"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                    color: "warmGray.50",
                }}
                style={{
                    textAlign:'center',
                    marginBottom:40
                }}
                >
                SOFF
                </Heading>


                <Heading
                mt="1"
                _dark={{
                    color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
                >
                Bienvenido de nuevo. ¡Buena suerte en tus ventas hoy!
                </Heading>


            <VStack space={3} mt="5">



                <FormControl>
                    <FormControl.Label>Correo</FormControl.Label>
                    <Input onChangeText={value => setData({...formData, email: value})}/>
                </FormControl>




                <FormControl>
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <Input type="password"/>
                    <Link
                    _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500",
                    }}
                    alignSelf="flex-end"
                    mt="1"
                    >
                    ¿Has olvidado tu contraseña?
                    </Link>
                </FormControl>

                
                <Button mt="2" colorScheme="indigo"
                    // onPress={onSubmit}
                    
                >
                    Iniciar sesión
                </Button>
                </VStack>
            </Box>
        </Center>
    );
};


export default Login;