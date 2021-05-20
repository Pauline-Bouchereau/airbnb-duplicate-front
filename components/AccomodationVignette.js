import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

import Stars from "../components/Stars";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const AccomodationVignette = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Accomodation", { id: item._id });
      }}
      style={styles.accomodationVignette}
    >
      <View>
        <Image
          source={{ uri: item.photos[0].url }}
          style={styles.accomodationPicture}
          resizeMode="cover"
        />
        <View style={styles.priceView}>
          <Text style={styles.price}> {item.price} € </Text>
        </View>
      </View>
      <View style={styles.infos}>
        <View style={styles.titleRatings}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.ratings}>
            <Stars rating={item.ratingValue} />
            <Text style={styles.reviews}>{item.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{
            uri: item.user.account.photo.url,
          }}
          style={styles.userPicture}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accomodationVignette: {
    width: "100%",
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    marginBottom: 15,
  },

  accomodationPicture: {
    height: 200,
    width: "100%",
  },

  priceView: {
    backgroundColor: "black",
    width: "25%",
    paddingVertical: 10,
    position: "absolute",
    bottom: 10,
    left: 0,
  },

  price: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  infos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },

  titleRatings: {
    width: "83%",
  },

  title: {
    fontSize: 18,
    width: "85%",
    marginVertical: 15,
  },

  ratings: {
    flexDirection: "row",
  },

  reviews: {
    color: lightGrey,
  },

  userPicture: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
});

export default AccomodationVignette;
