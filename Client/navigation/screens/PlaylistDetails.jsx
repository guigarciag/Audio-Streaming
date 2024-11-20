import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SongList from "../../components/SongList";
import FloatingButton from "../../components/FloatingButton";
import api from "../../services/api";
import * as ImagePicker from "expo-image-picker";

export default function PlaylistDetails({ route }) {
  const navigation = useNavigation();
  const [item, setItem] = useState(route.params.item || {});
  const [modalVisible, setModalVisible] = useState(false);
  const [removeSongModalVisible, setRemoveSongModalVisible] = useState(false);
  const [songToRemove, setSongToRemove] = useState(null);
  const [songs, setSongs] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState(item?.name || "");
  const [newImage, setNewImage] = useState(item?.background || "");

  async function getAllSongs() {
    try {
      const response = await api.get("/song/filter/getAll");
      setSongs(response.data);
    } catch (error) {
      Alert.alert(error.toString());
    }
  }
  useEffect(() => {
    if (modalVisible) {
      getAllSongs();
    }
  }, [modalVisible]);

  async function editPlaylist() {
    try {
      const playlistToSave = {
        name: newName,
        background: newImage,
      };

      const response = await api.put(`/playlist/${item.id}`, playlistToSave);

      const updatedValues = {
        id: response?.data?.playlist?.id,
        name: response?.data?.playlist?.name,
        owner: item?.owner,
        songs: response?.data?.playlist?.songs,
        background: response?.data?.playlist?.background
          ? response?.data?.playlist?.background
          : "",
      };

      setItem(updatedValues);
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", error?.response?.data?.erro || "Erro desconhecido.");
    }
  }

  const handleRemoveSong = (songId) => {
    setSongToRemove(songId);
    setRemoveSongModalVisible(true);
  };

  const confirmRemoveSong = () => {
    removeSongFromPlaylist(songToRemove);
    setRemoveSongModalVisible(false);
  };

  const removeSongFromPlaylist = async (songId) => {
    try {
      const response = await api.delete(`/playlist/${item.id}/${songId}`);

      if (response.status === 200) {
        const updatedValues = response.data.playlist;
        setItem(updatedValues);
      } else {
        console.log("Erro ao tentar remover a música da playlist");
      }
    } catch (error) {
      console.error("Erro ao remover a música:", error);
    }
  };

  async function addSongToPlaylist(songId) {
    try {
      const response = await api.put(`/playlist/${item.id}/${songId}`);
      const updatedValues = {
        id: response?.data?.playlist?.id,
        name: response?.data?.playlist?.name,
        owner: item?.owner,
        songs: response?.data?.playlist?.songs,
        background: response?.data?.playlist?.background
          ? response?.data?.playlist?.background
          : "",
      };
      setItem(updatedValues);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", error?.response?.data?.erro || "Erro desconhecido.");
    }
  }

  const handleSongClickModal = async (item) => {
    await addSongToPlaylist(item?.id);
  };

  const handleSongClickPlaylist = (songValue) => {
    navigation.navigate("SongPlayer", {
      songs: item.songs,
      initialIndex: item?.songs?.findIndex((song) => song.id === songValue.id),
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.playlistDetailsContainer}>
        {item?.background ? (
          <Image
            style={styles.playlistIcon}
            source={{
              uri: item.background,
            }}
          />
        ) : (
          <Image
            style={styles.playlistIcon}
            source={{
              uri: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
            }}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.owner}>{item.owner}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setEditModalVisible(true)}
      >
        <Ionicons name="ellipsis-vertical" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.songsContainer}>
        {item?.songs?.length > 0 ? (
          <SongList
            songs={item.songs}
            handleClick={handleSongClickPlaylist}
            handleDelete={handleRemoveSong}
          />
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.centerText}>
              No songs yet. Add your first one!
            </Text>
          </View>
        )}
      </View>

      <FloatingButton iconName="add" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Songs</Text>

            <SongList songs={songs} handleClick={handleSongClickModal} />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            <Text style={styles.modalTitle}>Edit Playlist</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              <Image
                style={styles.editIcon}
                source={{
                  uri:
                    newImage ||
                    item?.background ||
                    "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
                }}
              />
              <View style={styles.overlay}>
                <Ionicons name="create" size={70} color="white" />
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new playlist name"
              placeholderTextColor="gray"
            />
            <TouchableOpacity style={styles.saveButton} onPress={editPlaylist}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setNewImage(item?.background || "");
                setEditModalVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={removeSongModalVisible}
        onRequestClose={() => setRemoveSongModalVisible(false)}
      >
        <View style={styles.modalRemoveOverlay}>
          <View style={styles.modalRemoveContent}>
            <Text style={styles.modalRemoveTitle}>Remove Song</Text>
            <Text style={styles.modalRemoveMessage}>
              Are you sure you want to remove this song from the playlist?
            </Text>
            <View style={styles.modalRemoveButtons}>
              <TouchableOpacity
                style={styles.cancelRemoveButton}
                onPress={() => setRemoveSongModalVisible(false)}
              >
                <Text style={styles.cancelRemoveText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteRemoveButton}
                onPress={() => confirmRemoveSong()}
              >
                <Text style={styles.continueRemoveText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  imageContainer: {
    position: "relative",
  },
  editIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    opacity: 0.5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 10,
    opacity: 0.5,
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
  menuButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  songsContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    color: "grey",
    fontSize: 14,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "90%",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  editModalContent: {
    width: "80%",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#FF5C5C",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#444",
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
    borderRadius: 5,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 15,
  },
  deleteButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },

  modalRemoveOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalRemoveContent: {
    width: "80%",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalRemoveTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
  },
  modalRemoveMessage: {
    fontSize: 16,
    color: "white",
    marginBottom: 15,
  },
  modalRemoveButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelRemoveButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
  },
  cancelRemoveText: {
    color: "#aaa",
    fontSize: 16,
  },
  continueRemoveButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
    backgroundColor: "green",
    borderRadius: 5,
  },
  deleteRemoveButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
  continueRemoveText: {
    color: "white",
    fontSize: 16,
  },
});
