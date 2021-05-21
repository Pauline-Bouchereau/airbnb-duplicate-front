import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const GoBackArrow = () => {
  const navigation = useNavigation();
  return (
    <FontAwesome
      name="arrow-left"
      size={24}
      color={darkGrey}
      //   onPress={() => {
      //     navigation.goBak();
      //   }}
    />
  );
};

export default GoBackArrow;
