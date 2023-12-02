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

const FormConfirm = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    // Validar el código antes de enviar la solicitud
    if (!code.trim()) {
      setError("Por favor, completa este campo.");
      return;
    }

    // Realizar la lógica para confirmar el código de recuperación
    // ...

    // Limpiar el error después de un envío exitoso
    setError("");
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full md:w-[400px] p-4">
        <div className="space-y-3">
          <Heading
            size="2xl"
            fontWeight="bold"
            color="neutral.900"
            textAlign="center"
          >
            ¡Código de Confirmación! 🔐
          </Heading>
          <Text
            fontSize="sm"
            color="neutral.500"
            textAlign="center"
            mb="5"
          >
            Ingresa el código de confirmación que recibiste por correo electrónico.
          </Text>
        </div>
        <Center w="100%" h="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <VStack space={3} mt="5">
              <FormControl isInvalid={error !== ""}>
                <FormControl.Label>Código</FormControl.Label>
                <Input
                  placeholder="Ingrese el código"
                  value={code}
                  onChangeText={(value) => setCode(value)}
                />
                <Text fontSize="xs" color="red.500">
                  {error}
                </Text>
              </FormControl>

              <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
                Confirmar Código
              </Button>

              <Text
                mt="2"
                fontSize="sm"
                color="coolGray.600"
                textAlign="center"
              >
                ¡No me ha llegado un código!{" "}
                <Link color="indigo.500" onPress={() => {}}>
                  Volver a intentar
                </Link>
              </Text>
            </VStack>
          </Box>
        </Center>
      </div>
    </div>
  );
};

export default FormConfirm;