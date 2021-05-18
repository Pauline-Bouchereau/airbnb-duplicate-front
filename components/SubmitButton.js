import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const SubmitButton = ({ buttonRole, handlePress, isLoading }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>{buttonRole}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%",
    height: 50,
    borderRadius: 50,
    borderColor: salmon,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 18,
    color: darkGrey,
  },
});

export default SubmitButton;
