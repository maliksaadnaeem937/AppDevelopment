import { Stack } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ChatRoomHeader = () => {
  return (
    <Stack.Screen
      options={{
        headerTitle: () => (
          <View style={styles.container}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }} // contact avatar
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.status}>online</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="videocam-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: "#ededed",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  status: {
    fontSize: 12,
    color: "green",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default ChatRoomHeader;
