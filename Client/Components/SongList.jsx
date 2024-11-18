import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function SongList({ songs, handleClick }) {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleClick(item)}
        >
          <Image
            style={styles.tinyIcon}
            source={{
              uri: item.background,
            }}
          />
          <View style={styles.itemText}>
            <Text style={styles.songName}>{item.name}</Text>
            <Text style={{ color: "#CCCCCC" }}>{item.singer}</Text>
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
