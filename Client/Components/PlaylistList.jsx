import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

export default function PlaylistList({ playlists, onDelete, handleClick }) {
  const navigation = useNavigation();

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(item)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const handleDelete = (item) => {
    Alert.alert(
      "Excluir Playlist",
      `Tem certeza que deseja excluir a playlist "${item.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => onDelete(item.id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleClick(item)}
      >
        {item?.background ? (
          <Image
            style={styles.tinyIcon}
            source={{
              uri: item.background,
            }}
          />
        ) : (
          <Image
            style={styles.tinyIcon}
            source={{
              uri: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
            }}
          />
        )}
        <View style={styles.itemText}>
          <Text style={styles.playlistName}>{item.name}</Text>
          <Text style={{ color: "#CCCCCC" }}>{item.owner}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <FlatList
      data={playlists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
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
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
    padding: 20,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
