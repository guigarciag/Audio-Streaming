import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function PlaylistList() {
  const navigation = useNavigation();
  const mockPlaylist = {
    playlists: [
      {
        id: 1,
        name: "Old Songs",
        owner: "Paulin bacana",
        background:
          "https://upload.wikimedia.org/wikipedia/commons/3/3e/Side_A%2C_TDK_D-C60_20041220.jpg",
      },
      {
        id: 2,
        name: "New Songs",
        owner: "Paulin bacana",
        background:
          "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
      },
      {
        id: 3,
        name: "Super old Songs",
        owner: "Paulin bacana",
        background:
          "https://media.gettyimages.com/id/168324851/pt/foto/sujo-gira-discos-e-registar-no-fundo-f%C3%B3rmica.jpg?s=2048x2048&w=gi&k=20&c=wNEVGAY9-M1L9XYK_PqJ0MmsWkqcDsdg7EMYFSAH_F8=",
      },
    ],
  };
  return (
    <FlatList
      data={mockPlaylist.playlists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate("PlaylistDetails", { item: item })}
        >
          <Image
            style={styles.tinyIcon}
            source={{
              uri: item.background,
            }}
          />
          <View style={styles.itemText}>
            <Text style={styles.playlistName}>{item.name}</Text>
            <Text style={{ color: "white" }}>{item.owner}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#121212",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tinyIcon: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  itemText: {
    justifyContent: "center",
  },
  playlistName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
