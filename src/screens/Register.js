import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import ProfileImage from "../components/ProfileImage";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [carnet, setCarnet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const cleanName = fullName.trim();
    const cleanBirthDate = birthDate.trim();
    const cleanCarnet = carnet.trim();
    const cleanImageUrl = imageUrl.trim();
    const cleanEmail = email.trim();

    if (
      !cleanName ||
      !cleanBirthDate ||
      !cleanCarnet ||
      !cleanImageUrl ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Campos requeridos", "Completa todos los campos.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanBirthDate)) {
      Alert.alert("Fecha inválida", "Usa el formato AAAA-MM-DD.");
      return;
    }

    if (!/^https?:\/\//i.test(cleanImageUrl)) {
      Alert.alert("URL inválida", "La URL de imagen debe iniciar con http:// o https://.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Contraseñas diferentes", "Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      await register({
        email: cleanEmail,
        password,
        fullName: cleanName,
        birthDate: cleanBirthDate,
        carnet: cleanCarnet,
        imageUrl: cleanImageUrl
      });
    } catch (error) {
      let message = "No fue posible crear la cuenta.";

      if (error.code === "auth/email-already-in-use") {
        message = "Ese correo electrónico ya está registrado.";
      }

      if (error.code === "auth/invalid-email") {
        message = "El correo electrónico no es válido.";
      }

      if (error.code === "auth/weak-password") {
        message = "La contraseña es demasiado débil.";
      }

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Completa la información solicitada.</Text>

          <ProfileImage imageUrl={imageUrl.trim()} size={88} />

          <AppInput
            label="Nombre completo"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nombre completo"
          />

          <AppInput
            label="Fecha de nacimiento"
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="AAAA-MM-DD"
            autoCapitalize="none"
          />

          <AppInput
            label="Carnet institucional"
            value={carnet}
            onChangeText={setCarnet}
            placeholder="Carnet"
            autoCapitalize="characters"
          />

          <AppInput
            label="URL de imagen"
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://..."
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <AppInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <AppInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
          />

          <AppInput
            label="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repite la contraseña"
            secureTextEntry
          />

          <AppButton title="Registrarme" onPress={handleRegister} loading={loading} />
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
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6
  },
  subtitle: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 22
  }
});
