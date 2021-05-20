import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon, yellow } = colors;

const Stars = ({ rating }) => {
  const displayStars = (value) => {
    const tab = [];
    for (let i = 0; i <= 5; i++) {
      if (i <= value) {
        tab.push(
          <FontAwesome
            name="star"
            size={20}
            color={yellow}
            style={styles.star}
            key={i}
          />
        );
      } else {
        tab.push(
          <FontAwesome
            name="star"
            size={20}
            color={lightGrey}
            style={styles.star}
            key={i}
          />
        );
      }
    }

    return tab;
  };

  return <View style={styles.rating}>{displayStars(rating)}</View>;
};

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
  },

  star: {
    marginRight: 8,
  },
});

export default Stars;
