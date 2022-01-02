import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function ButtonComponent({ text, callback, additionalStyle }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => callback()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});

export default ButtonComponent;
