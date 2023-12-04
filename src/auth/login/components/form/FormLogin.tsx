import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface FormData {
  email?: string;
  password?: string;
}

export default function FormLogin() {
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
    <View style={styles.container}>
      <Text style={styles.logo}>SOFF</Text>
      <Text style={styles.welcomeText}>
        Bienvenido de nuevo. ¡Buena suerte en tus ventas hoy!
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          onChangeText={(value) => setData({ ...formData, email: value })}
          onBlur={validateEmail}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(value) => setData({ ...formData, password: value })}
          onBlur={validatePassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={async () => {
          if (validateForm()) {
            
            console.log({username:formData.email, password:formData.password})
            const response = await fetch('http://localhost:8000/auth/login', {
              headers: {
                "accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              body: `${encodeURIComponent('username')}=${encodeURIComponent(formData.email)}&${encodeURIComponent('password')}=${encodeURIComponent(formData.password)}`
            
            }).then(res => res.json())
            console.log(response)

          }
        }}
      >
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordLink}>
        <Text style={styles.forgotPasswordText}>
          ¿Has olvidado tu contraseña?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: "#5c6bc0",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordLink: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "#5c6bc0",
    fontSize: 14,
    fontWeight: "bold",
  },
});