import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function SongList({ songs, handleClick, handleDelete }) {
  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(item.id)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const songItem = (
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
    );

    if (handleDelete) {
      return (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          {songItem}
        </Swipeable>
      );
    } else {
      return songItem;
    }
  };

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
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
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
