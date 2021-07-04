import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import axios from "axios";

import AccomodationVignette from "../components/AccomodationVignette";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

export default function HomeScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      color={salmon}
      size="large"
      style={styles.activityIndicator}
    />
  ) : (
    <View style={styles.homePage}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AccomodationVignette item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
