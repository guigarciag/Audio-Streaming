import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "./screens/Home";
import Playlists from "./screens/Playlists";
import AllSongs from "./screens/AllSongs";
import PlaylistDetails from "./screens/PlaylistDetails";
import SongPlayer from "./screens/SongPlayer";

// Screen names
const homeName = "Home";
const playlistsName = "Playlists";
const allSongsName = "AllSongs";
const playlistDetailsName = "PlaylistDetails";
const songPlayer = "SongPlayer"


// Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === playlistsName) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === allSongsName) {
            iconName = focused ? "disc" : "disc-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1eff00",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
          fontSize: 10,
          padding: 10,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={playlistsName}
        component={Playlists}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={allSongsName}
        component={AllSongs}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={playlistDetailsName}
          component={PlaylistDetails}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name={songPlayer}
          component={SongPlayer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
