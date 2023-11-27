import React, { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Text,
} from "native-base";

interface FormData {
  email?: string;
  password?: string;
}

const Login = () => {
  const [formData, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateEmail = () => {
    let emailError: string | undefined;

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      emailError = "Ingresa un correo electrónico válido";
    }

    setErrors({ ...errors, email: emailError });
  };

  const validatePassword = () => {
    let passwordError: string | undefined;

    // Validación de contraseña (debe contener al menos 8 caracteres)
    const passwordRegex = /^.{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      passwordError = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors({ ...errors, password: passwordError });
  };

  const validateForm = () => {
    let errors: Partial<FormData> = {};

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Ingresa un correo electrónico válido";
    } else {
      delete errors.email; // Elimina el error si el correo es válido
    }

    // Validación de contraseña (debe contener al menos 8 caracteres)
    const passwordRegex = /^.{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else {
      delete errors.password; // Elimina el error si la contraseña es válida
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Devuelve verdadero si no hay errores
  };

  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="3xl"
          fontWeight="600"
          color="coolGray.800"
          style={{
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          SOFF
        </Heading>

        <Heading
          mt="1"
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Bienvenido de nuevo. ¡Buena suerte en tus ventas hoy!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isInvalid={"email" in errors}>
            <FormControl.Label>Correo</FormControl.Label>
            <Input
              onChangeText={(value) => setData({ ...formData, email: value })}
              onBlur={validateEmail}
            />
            <Text fontSize="xs" color="red.500">
              {errors.email}
            </Text>
          </FormControl>

          <FormControl isInvalid={"password" in errors}>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
              onBlur={validatePassword}
            />
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
            <Text fontSize="xs" color="red.500">
              {errors.password}
            </Text>
          </FormControl>

          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              if (validateForm()) {
                // Coloca aquí el código para enviar los datos al servidor
                // y realizar la autenticación
              }
            }}
          >
            Iniciar sesión
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;