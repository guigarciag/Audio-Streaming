import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PlaylistList from "../../Components/PlaylistList";
import FloatingButton from "../../Components/FloatingButton";

export default function Playlists() {
  const [modalVisible, setModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Library</Text>
      </View>
      <View style={styles.playlistsContainer}>
        <PlaylistList />
      </View>
      <FloatingButton iconName={"add"} onPress={() => setModalVisible(true)} />

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
  playlistsContainer: {
    marginTop: 10,
    marginBottom: 85,
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
  continueText: {
    color: "white",
    fontSize: 16,
  },
});
