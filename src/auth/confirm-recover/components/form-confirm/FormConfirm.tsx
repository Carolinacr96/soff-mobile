import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.spaceY3}>
        <Text style={styles.heading}>
          ¡Código de Confirmación! 🔐
        </Text>
        <Text style={styles.description}>
          Ingresa el código de confirmación que recibiste por correo electrónico.
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.vStack}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Código</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el código"
              value={code}
              onChangeText={(value) => setCode(value)}
            />
            {error !== "" && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Confirmar Código</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            ¡No me ha llegado un código!{" "}
            <Text style={styles.link} onPress={() => {}}>
              Volver a intentar
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
    fontWeight: "bold",
    color: "#1a202c",
  },
  description: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
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

export default FormConfirm;