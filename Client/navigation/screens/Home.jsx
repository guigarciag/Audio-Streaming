import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  return (
    <LinearGradient colors={["#121212", "#121212"]} style={styles.container}>
      <ImageBackground
        source={{ uri: "https://your-image-url.com" }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Ionicons
            name="radio"
            size={300}
            color="#4a4a4a"
            style={styles.radioIcon}
          />
          <Text style={styles.title}>AUDIO STREAMING</Text>
          <Text style={styles.subtitle}>
            Experience Music Like Never Before
          </Text>

          <Ionicons
            name="disc"
            size={200}
            color="#28a745"
            style={styles.vinylIcon}
          />

          <Ionicons
            name="musical-notes"
            size={100}
            color="#28a745"
            style={styles.musicIcon}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  title: {
    color: "#1eff00",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    zIndex: 2,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    zIndex: 2,
  },
  vinylIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.6,
    transform: [{ scale: 1.5 }, { translateX: 50 }, { translateY: -50 }],
  },
  musicIcon: {
    position: "absolute",
    bottom: 90,
    left: -90,
    opacity: 0.6,
    transform: [{ scale: 1.5 }, { translateX: 50 }, { translateY: 50 }],
  },
  radioIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    opacity: 0.3,
    transform: [{ translateX: -150 }, { translateY: -150 }],
    zIndex: 1,
  },
});
