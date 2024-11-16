import { StyleSheet, Text, View } from "react-native";
import SongList from "../../Components/SongList";

export default function AllSongs() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={styles.songsContainer}>
        <SongList />
      </View>
    </View>
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
});
