import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SongPlayer = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const audioUrl = `http://192.168.0.10:4000/audio/${item.path}`;

  useEffect(() => {
    const loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false }
        );

        setSound(sound);
        setIsLoaded(true);

        const status = await sound.getStatusAsync();
        setDuration(status.durationMillis);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.positionMillis !== undefined) {
            if (!isUpdatingProgress) {
              setProgress(status.positionMillis);
            }
          }
        });
      } catch (err) {
        console.error("Erro ao carregar o áudio:", err);
        setError("Falha ao carregar o áudio");
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [isUpdatingProgress]);

  const togglePlayback = async () => {
    if (!isLoaded) {
      console.log("Áudio ainda não foi carregado");
      return;
    }

    const status = await sound.getStatusAsync();

    if (status.isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setIsUpdatingProgress(false);
    } else if (status.isLoaded && status.positionMillis > 0) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsUpdatingProgress(true);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
      setIsUpdatingProgress(true);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = useCallback(
    async (value) => {
      if (sound) {
        await sound.setPositionAsync(value);
        setProgress(value);
      }
    },
    [sound]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Image style={styles.image} source={{ uri: item.background }} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.artist}>{item.singer}</Text>

      <Slider
        style={styles.progressBar}
        value={progress}
        maximumValue={duration}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#fff"
        thumbTintColor="#1DB954"
        onValueChange={handleSliderChange}
        disabled={true}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(progress)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.audioButtonsScreen}>
        <TouchableOpacity style={styles.buttonPlay} onPress={togglePlayback}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={50}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  artist: {
    fontSize: 18,
    color: "gray",
    marginBottom: 30,
  },
  buttonPlay: {
    backgroundColor: "#1DB954",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  audioButtonsScreen: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
  progressBar: {
    width: "80%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  timeText: {
    color: "#fff",
  },
});

export default SongPlayer;
