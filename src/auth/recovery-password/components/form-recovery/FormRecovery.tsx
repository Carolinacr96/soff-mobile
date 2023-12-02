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

const FormRecovery = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    // Validar el correo electrónico antes de enviar la solicitud
    if (!validateEmail(email)) {
      setError("Ingresa una dirección de correo electrónico válida.");
      return;
    }

    // Realizar la lógica para enviar el código de recuperación al correo electrónico
    // ...

    // Limpiar el error después de un envío exitoso
    setError("");
  };

  const validateEmail = (value) => {
    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
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

        <VStack space={3} mt="5">
          <FormControl isInvalid={error !== ""}>
            <FormControl.Label>Correo</FormControl.Label>
            <Input
              placeholder="Ingrese su correo"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Text fontSize="xs" color="red.500">
              {error}
            </Text>
          </FormControl>

          <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
            Enviar Código
          </Button>

          <Text mt="2" fontSize="sm" color="coolGray.600" textAlign="center">
            ¡Ya me acuerdo!{" "}
            <Link color="indigo.500" onPress={() => {}}>
              Iniciar sesión
            </Link>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default FormRecovery;