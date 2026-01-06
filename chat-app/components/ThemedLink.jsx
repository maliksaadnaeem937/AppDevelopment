import { Link } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

const ThemedLink = ({ style, children, ...props }) => {
  return (
    <Link style={[styles.defaultStyle, style]} {...props}>
      {children}
    </Link>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: Colors["light"].linkColor,
  },
});

export default ThemedLink;
