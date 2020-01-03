import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  flex: {
    flex: 1
  },
  displayContainer: { flex: 1, alignSelf: "stretch" },
  inputContainer: { flex: 1, alignSelf: "stretch", flexDirection: "row" },
  displayText: {
    bottom: 10,
    right: 10,
    margin: 10,
    position: "absolute",
    fontSize: 100
  }
});

export const calculatorButton = StyleSheet.create({
  numbers: { fontSize: 45 },
  operants: { fontSize: 35 }
});
