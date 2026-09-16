import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import ProfileImage from "../components/ProfileImage";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";

export default function Dashboard() {
  const user = auth.currentUser;
  const { logout } = useAuth();
  const { profile, loading, updateProfile } = useProfile(user?.uid);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [carnet, setCarnet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setBirthDate(profile.birthDate || "");
      setCarnet(profile.carnet || "");
      setImageUrl(profile.imageUrl || "");
    }
  }, [profile]);

  const handleSave = async () => {
    const cleanName = fullName.trim();
    const cleanBirthDate = birthDate.trim();
    const cleanCarnet = carnet.trim();
    const cleanImageUrl = imageUrl.trim();

    if (!cleanName || !cleanBirthDate || !cleanCarnet || !cleanImageUrl) {
      Alert.alert("Campos requeridos", "Completa todos los campos del perfil.");
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

    try {
      setSaving(true);
      await updateProfile({
        fullName: cleanName,
        birthDate: cleanBirthDate,
        carnet: cleanCarnet,
        imageUrl: cleanImageUrl
      });
      Alert.alert("Perfil actualizado", "Los datos se guardaron correctamente.");
    } catch {
      Alert.alert("Error", "No fue posible actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      Alert.alert("Error", "No fue posible cerrar la sesión.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1D5FD1" />
      </View>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No se encontró tu perfil.</Text>
          <AppButton title="Cerrar sesión" onPress={handleLogout} secondary />
        </View>
      </SafeAreaView>
    );
  }

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
          <ProfileImage imageUrl={imageUrl.trim()} size={100} />

          <Text style={styles.email}>{profile.email || user?.email}</Text>

          <AppInput
            label="Nombre completo"
            value={fullName}
            onChangeText={setFullName}
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
            autoCapitalize="characters"
          />

          <AppInput
            label="URL de imagen"
            value={imageUrl}
            onChangeText={setImageUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <AppButton title="Guardar cambios" onPress={handleSave} loading={saving} />
          <AppButton title="Cerrar sesión" onPress={handleLogout} secondary />
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
    paddingTop: 24,
    paddingBottom: 40
  },
  email: {
    fontSize: 14,
    color: "#666666",
    marginTop: 12,
    marginBottom: 24
  },
  loading: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  empty: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 20
  }
});
