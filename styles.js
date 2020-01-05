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
  displayTextContainer: {
    bottom: 20,
    right: 10,
    margin: 10,
    position: "absolute"
  },
  displayText: {
    flex: 1,
    fontSize: 100
  }
});

export const calculatorButton = StyleSheet.create({
  numbers: { fontSize: 45, color: "black" },
  operants: { fontSize: 35, color: "black" },
  operantsSelected: { fontSize: 35, color: "white" },
  container: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
