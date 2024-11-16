import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.text}>AUDIO STREAMING</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textShadowColor: "rgba(30, 255, 10, 1)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 20,
  },
});
