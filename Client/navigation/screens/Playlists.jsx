import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import PlaylistList from "../../components/PlaylistList";
import FloatingButton from "../../components/FloatingButton";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Playlists() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const { userLogged } = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getPlaylists();
    }, [])
  );

  const handlePlaylistClick = async (item) => {
    if (item?.songs?.length > 0) {
      try {
        const fullPlaylist = await getPlaylisitSongs(item?.id);
        navigation.navigate("PlaylistDetails", { item: fullPlaylist });
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
      }
    } else {
      navigation.navigate("PlaylistDetails", { item });
    }
  };

  async function getPlaylisitSongs(id) {
    try {
      const response = await api.get(`/playlist/getAllSongs/${id}`);
      return response?.data?.playlist;
    } catch (error) {
      Alert.alert(error.toString());
    }
  }

  async function getPlaylists() {
    try {
      const response = await api.get("/playlist/filter/getAll");
      setPlaylists(response.data);
    } catch (error) {
      Alert.alert(error.toString());
    }
  }

  async function createPlaylist() {
    try {
      const request = {
        name: playlistName,
        owner: userLogged?.id,
      };
      await api.post("/playlist", request);
      getPlaylists();
    } catch (error) {
      Alert.alert(error.toString());
    }
  }

  async function handleDeletePlaylist(id) {
    try {
      await api.delete(`/playlist/${id}`);
      getPlaylists();
      setDeleteModalVisible(false);
    } catch (error) {
      Alert.alert(error.toString());
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Library</Text>
        </View>
        {playlists.length > 0 ? (
          <View style={styles.playlistsContainer}>
            <PlaylistList
              playlists={playlists}
              onDelete={(id) => {
                setPlaylistToDelete(id);
                setDeleteModalVisible(true);
              }}
              handleClick={handlePlaylistClick}
            />
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.centerText}>
              No playlists yet. Create your first one!
            </Text>
          </View>
        )}
        <FloatingButton iconName="add" onPress={() => setModalVisible(true)} />
      </View>

      {/* Modal para criação de playlist */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Playlist Name"
              placeholderTextColor="#aaa"
              value={playlistName}
              onChangeText={setPlaylistName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setPlaylistName("");
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  createPlaylist();
                  setModalVisible(false);
                  setPlaylistName("");
                }}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Playlist</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this playlist?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePlaylist(playlistToDelete)}
              >
                <Text style={styles.continueText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  playlistsContainer: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: "white",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
  },
  cancelText: {
    color: "#aaa",
    fontSize: 16,
  },
  continueButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
    backgroundColor: "green",
    borderRadius: 5,
  },
  deleteButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
  continueText: {
    color: "white",
    fontSize: 16,
  },
});
