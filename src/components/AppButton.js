import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export default function AppButton({ title, onPress, loading = false, secondary = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        secondary ? styles.secondary : styles.primary,
        pressed && styles.pressed,
        loading && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? "#1D5FD1" : "#FFFFFF"} />
      ) : (
        <Text style={[styles.text, secondary ? styles.secondaryText : styles.primaryText]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },
  primary: {
    backgroundColor: "#1D5FD1"
  },
  secondary: {
    backgroundColor: "#F2F2F2"
  },
  text: {
    fontSize: 16,
    fontWeight: "600"
  },
  primaryText: {
    color: "#FFFFFF"
  },
  secondaryText: {
    color: "#1D5FD1"
  },
  pressed: {
    opacity: 0.8
  },
  disabled: {
    opacity: 0.6
  }
});
