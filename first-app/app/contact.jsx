import { StyleSheet } from "react-native";
import Logo from "../assets/adaptive-icon.png";
import { Image } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedLink from "../components/ThemedLink";

export default function ContactScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Contact Page
      </ThemedText>
      <ThemedText style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique,
        nisi.
      </ThemedText>

      <Image source={Logo} style={styles.image} />

      <ThemedLink href={"/"} style={styles.link}>
        Go To Home Page
      </ThemedLink>
      <ThemedLink href={"about"} style={styles.link}>
        Go To About Page
      </ThemedLink>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  description: {
    textAlign: "center",
    paddingInline: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
  link: {
    paddingInline: 12,
    paddingBlock: 6,
    borderRadius: 4,
    fontStyle: "bold",
  },
});
