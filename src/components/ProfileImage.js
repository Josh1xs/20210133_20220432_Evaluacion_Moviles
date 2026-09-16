import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileImage({ imageUrl, size = 96 }) {
  if (!imageUrl) {
    return (
      <View style={[styles.placeholder, { width: size, height: size }]}>
        <Text style={styles.placeholderText}>Sin imagen</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUrl }}
      style={{ width: size, height: size }}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center"
  },
  placeholderText: {
    color: "#777777",
    fontSize: 12
  }
});
