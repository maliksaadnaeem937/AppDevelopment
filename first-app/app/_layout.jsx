import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
const RootLayout = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors["light"];
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />

        <Stack.Screen
          name="about"
          options={{
            title: "About",
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            title: "Contact",
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
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "orange",
  },
});

export default RootLayout;
