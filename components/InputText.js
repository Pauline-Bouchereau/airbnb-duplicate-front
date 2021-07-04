import React from "react";
import { TextInput, StyleSheet } from "react-native";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const InputText = ({ placeholderText, secureBoolean, value, setValue }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholderText}
      secureTextEntry={secureBoolean}
      onChangeText={(str) => {
        setValue(str);
      }}
      value={value}
      keyboardType={placeholderText === "email" ? "email-address" : "default"}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 50,
    marginBottom: 15,
    borderBottomColor: lightSalmon,
    borderBottomWidth: 1,
  },
});

export default InputText;
