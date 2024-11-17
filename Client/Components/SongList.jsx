import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function SongList() {
  const navigation = useNavigation();
  const mockSong = {
    songs: [
      {
        id: 1,
        name: "Another One Bites The Dust",
        singer: "Queen",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Queen_-_Another_One_Bites_the_Dust_-_1980.jpg/330px-Queen_-_Another_One_Bites_the_Dust_-_1980.jpg",
        path: "string",
      },
      {
        id: 2,
        name: "Shoud I Stay Or Should I Go",
        singer: "The Clash",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/2/2e/Combat_Rock.jpg",
        path: "string",
      },
      {
        id: 3,
        name: "This Love",
        singer: "Maroon 5",
        background:
          "https://upload.wikimedia.org/wikipedia/en/b/be/Maroon_5_-_Songs_About_Jane.png",
        path: "string",
      },
      {
        id: 4,
        name: "Another One Bites The Dust",
        singer: "Queen",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Queen_-_Another_One_Bites_the_Dust_-_1980.jpg/330px-Queen_-_Another_One_Bites_the_Dust_-_1980.jpg",
        path: "string",
      },
      {
        id: 5,
        name: "Shoud I Stay Or Should I Go",
        singer: "The Clash",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/2/2e/Combat_Rock.jpg",
        path: "string",
      },
      {
        id: 6,
        name: "This Love",
        singer: "Maroon 5",
        background:
          "https://upload.wikimedia.org/wikipedia/en/b/be/Maroon_5_-_Songs_About_Jane.png",
        path: "string",
      },
      {
        id: 7,
        name: "Another One Bites The Dust",
        singer: "Queen",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Queen_-_Another_One_Bites_the_Dust_-_1980.jpg/330px-Queen_-_Another_One_Bites_the_Dust_-_1980.jpg",
        path: "string",
      },
      {
        id: 8,
        name: "Shoud I Stay Or Should I Go",
        singer: "The Clash",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/2/2e/Combat_Rock.jpg",
        path: "string",
      },
      {
        id: 9,
        name: "This Love",
        singer: "Maroon 5",
        background:
          "https://upload.wikimedia.org/wikipedia/en/b/be/Maroon_5_-_Songs_About_Jane.png",
        path: "string",
      },
      {
        id: 10,
        name: "Another One Bites The Dust",
        singer: "Queen",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Queen_-_Another_One_Bites_the_Dust_-_1980.jpg/330px-Queen_-_Another_One_Bites_the_Dust_-_1980.jpg",
        path: "string",
      },
      {
        id: 11,
        name: "Shoud I Stay Or Should I Go",
        singer: "The Clash",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/2/2e/Combat_Rock.jpg",
        path: "string",
      },
      {
        id: 12,
        name: "This Love",
        singer: "Maroon 5",
        background:
          "https://upload.wikimedia.org/wikipedia/en/b/be/Maroon_5_-_Songs_About_Jane.png",
        path: "string",
      },
      {
        id: 13,
        name: "Another One Bites The Dust",
        singer: "Queen",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Queen_-_Another_One_Bites_the_Dust_-_1980.jpg/330px-Queen_-_Another_One_Bites_the_Dust_-_1980.jpg",
        path: "string",
      },
      {
        id: 14,
        name: "Shoud I Stay Or Should I Go",
        singer: "The Clash",
        background:
          "https://upload.wikimedia.org/wikipedia/pt/2/2e/Combat_Rock.jpg",
        path: "string",
      },
      {
        id: 15,
        name: "This Love",
        singer: "Maroon 5",
        background:
          "https://upload.wikimedia.org/wikipedia/en/b/be/Maroon_5_-_Songs_About_Jane.png",
        path: "string",
      },
    ],
  };
  return (
    <FlatList
      data={mockSong.songs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer} 
        onPress ={() => 
          navigation.navigate("SongPlayer", { item: item })
        }>
          <Image
            style={styles.tinyIcon}
            source={{
              uri: item.background,
            }}
          />
          <View style={styles.itemText}>
            <Text style={styles.songName}>{item.name}</Text>
            <Text style={{ color: "white" }}>{item.singer}</Text>
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
    marginBottom: 2,
    backgroundColor: "#121212",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tinyIcon: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  itemText: {
    justifyContent: "center",
  },
  songName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
