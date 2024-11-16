import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FloatingButton = ({ onPress, iconName }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}
        pointerEvents="box-none"
      >
        <Ionicons name={iconName} size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});

export default FloatingButton;
