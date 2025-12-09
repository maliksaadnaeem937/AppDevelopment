import { StyleSheet, useColorScheme, View } from "react-native";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedView = ({ style, children, safe = false, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const inset = useSafeAreaInsets();
  console.log(inset,safe)

  if (!safe) {
    return (
      <View style={[{ backgroundColor: theme.background }, style]} {...props}>
        {children}
      </View>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: inset.top + 5,
          paddingBottom: inset.bottom,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ThemedView;
