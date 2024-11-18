import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import SongList from "../../components/SongList";
import { useNavigation } from "@react-navigation/native";

export default function AllSongs() {
  const navigation = useNavigation();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, []);

  async function getSongs() {
    try {
      const response = await api.get("/song/filter/getAll");
      setSongs(response.data);
    } catch (error) {
      Alert.alert(error.toString());
    }
  }

  const handleSongClick = (item) => {
    navigation.navigate("SongPlayer", { item: item });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Search</Text>
        </View>
        {songs.length > 0 ? (
          <View style={styles.songsContainer}>
            <SongList songs={songs} handleClick={handleSongClick} />
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.centerText}>No songs available!</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  titleContainer: {
    marginTop: "10%",
    borderBottomWidth: 1,
    borderColor: "white",
  },
  title: {
    marginLeft: "10%",
    fontSize: 30,
    color: "white",
    marginBottom: 10,
  },
  songsContainer: {
    marginTop: 10,
    marginBottom: 85,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    color: "grey",
    fontSize: 14,
  },
});
