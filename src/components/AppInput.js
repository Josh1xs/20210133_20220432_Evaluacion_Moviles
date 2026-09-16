import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AppInput({ label, style, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#8A8A8A"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    color: "#222222",
    marginBottom: 7
  },
  input: {
    width: "100%",
    minHeight: 48,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111111"
  }
});
