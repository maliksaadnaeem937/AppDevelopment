import { StyleSheet, useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors["light"];
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.navBackground,
        },
        tabBarActiveTintColor: theme.iconColourFocused,
        tabBarInactiveTintColor: theme.iconColour,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={30}
              color={focused ? theme.iconColourFocused : theme.iconColour}
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="books"
        options={{
          title: "Books",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={30}
              color={focused ? theme.iconColourFocused : theme.iconColour}
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "create" : "create-outline"}
              size={30}
              color={focused ? theme.iconColourFocused : theme.iconColour}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default DashboardLayout;
