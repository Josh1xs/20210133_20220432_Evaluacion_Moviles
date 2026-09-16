import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import useAuth from "../hooks/useAuth";

export default function Login({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Campos requeridos", "Ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch (error) {
      let message = "No fue posible iniciar sesión.";

      if (error.code === "auth/invalid-email") {
        message = "El correo electrónico no es válido.";
      }

      if (error.code === "auth/invalid-credential") {
        message = "El correo o la contraseña son incorrectos.";
      }

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.subtitle}>Ingresa con tu correo electrónico.</Text>

            <AppInput
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="correo@ejemplo.com"
            />

            <AppInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Contraseña"
            />

            <AppButton title="Iniciar sesión" onPress={handleLogin} loading={loading} />

            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Crear una cuenta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  flex: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40
  },
  form: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 30
  },
  link: {
    color: "#1D5FD1",
    textAlign: "center",
    fontSize: 15,
    marginTop: 22
  }
});
