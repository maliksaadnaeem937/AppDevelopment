import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import Toast from "react-native-toast-message";
import BooksProvider from "../contexts/BooksContext";
import ChatProvider from "../contexts/ChatContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors["light"];
  return (
    <UserProvider>
      <BooksProvider>
        <ChatProvider>
          <StatusBar value="auto" />
          <Stack
            screenOptions={{
              animation: "slide_from_right",
              headerStyle: {
                backgroundColor: theme.navBackground,
              },
              headerTintColor: theme.title,
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
              }}
            />

            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(dashboard)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(chat)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          {/* Add position="bottom" prop */}
          <Toast position="bottom" />
        </ChatProvider>
      </BooksProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "orange",
  },
});

export default RootLayout;