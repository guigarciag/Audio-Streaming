import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, } from "react-native";
const { width } = Dimensions.get('window');


const SongPlayer = ({ route }) => {
  const { item } = route.params; // Recebe os dados passados pela navegação

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.background }} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.artist}>{item.singer}</Text>

      <View style={styles.audioButtonsScreen}>
      <TouchableOpacity style={styles.otherButtons}>
        <Text style={styles.buttonText}>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonPlay}>
        <Text style={styles.buttonText}>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.otherButtons}>
        <Text style={styles.buttonText}>
        </Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
    },
    artist: {
      fontSize: 18,
      color: "gray",
      marginBottom: 30,
    },
    buttonPlay: {
      backgroundColor: "#1DB954",
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 50,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    audioButtonsScreen: {
        backgroundColor: "#000",
        flexDirection: "row",
    },
    otherButtons:{
        color: "#4b524d",
        backgroundColor: "grey",
        paddingVertucal: 20,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginHorizontal: 70,
        borderColor: '#997',
    }
  });

export default SongPlayer;