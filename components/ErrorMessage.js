import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const ErrorMessage = ({ error }) => {
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (error === 1) {
      setErrorMessage("Please fill all fields.");
    } else if (error === 2) {
      setErrorMessage("Wrong email and/or password.");
    } else if (error === 3) {
      setErrorMessage("An error has occured, please try again.");
    } else if (error === 4) {
      setErrorMessage("Passwords must be the same.");
    } else if (error === 5) {
      setErrorMessage("An account already exists with this email adress.");
    } else if (error === 6) {
      setErrorMessage("This username is not available.");
    }
  }, [error]);

  return error > 0 && <Text style={styles.error}>{errorMessage}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: salmon,
    marginBottom: 5,
  },
});

export default ErrorMessage;
