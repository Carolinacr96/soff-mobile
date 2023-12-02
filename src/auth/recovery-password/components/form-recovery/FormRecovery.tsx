import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.spaceY3}>
        <Text style={styles.heading}>
          SOFF
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.vStack}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su correo"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            {error !== "" && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Enviar Código</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            ¡Ya me acuerdo!{" "}
            <Text style={styles.link} onPress={() => {}}>
              Iniciar sesión
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  spaceY3: {
    marginBottom: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a202c",
  },
  box: {
    padding: 16,
    width: "90%",
    maxWidth: 290,
  },
  vStack: {
    marginTop: 20,
  },
  formControl: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e0",
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#5c6bc0",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomText: {
    marginTop: 20,
    textAlign: "center",
  },
  link: {
    color: "#5c6bc0",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FormRecovery;