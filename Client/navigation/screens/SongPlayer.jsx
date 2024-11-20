import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const SongPlayer = ({ route }) => {
  const navigation = useNavigation();
  const { songs, initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentIndex];
  const audioUrl = `http://192.168.0.10:4000/audio/${currentSong.path}`;

  useEffect(() => {
    const loadAudio = async () => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );

        soundRef.current = sound;
        setIsLoaded(true);
        setIsPlaying(true);

        const status = await sound.getStatusAsync();
        setDuration(status.durationMillis);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setProgress(status.positionMillis);
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              handleNext();
            }
          }
        });
      } catch (err) {
        console.error("Erro ao carregar o áudio:", err);
      }
    };

    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [currentIndex]);

  const togglePlayback = async () => {
    if (!isLoaded || !soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = useCallback(async (value) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
      setProgress(value);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Image style={styles.image} source={{ uri: currentSong.background }} />
      <Text style={styles.title}>{currentSong.name}</Text>
      <Text style={styles.artist}>{currentSong.singer}</Text>

      <Slider
        style={styles.progressBar}
        value={progress}
        maximumValue={duration}
        minimumValue={0}
        onValueChange={(value) => setProgress(value)}
        onSlidingComplete={handleSliderChange}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#fff"
        thumbTintColor="#1DB954"
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(progress)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.audioButtonsScreen}>
        <TouchableOpacity onPress={handlePrevious} style={styles.button}>
          <Ionicons name="play-skip-back" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback} style={styles.buttonPlay}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={50}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Ionicons name="play-skip-forward" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
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
  button: {
    marginTop: 10,
    padding: 10,
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
    width: 80,
    height: 80,
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
