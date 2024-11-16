import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SongList from "../../Components/SongList";

export default function PlaylistDetails({ route }) {
  const navigation = useNavigation();
  const { item } = route.params || {};
  console.log(item);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.playlistDetailsContainer}>
        <Image
          style={styles.playlistIcon}
          source={{
            uri: item.background,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.owner}>{item.owner}</Text>
        </View>
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  playlistDetailsContainer: {
    alignItems: "center",
    marginTop: "18%",
    borderBottomWidth: 1,
    borderColor: "white",
  },
  playlistIcon: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: 15,
    marginLeft: 20,
    width: "100%",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  owner: {
    fontSize: 18,
    color: "#CCCCCC",
    marginTop: 5,
    marginBottom: 15,
  },
  songsContainer: {
    marginTop: 10,
    marginBottom: 400,
  },
});
