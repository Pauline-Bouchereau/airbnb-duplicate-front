import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import MapView from "react-native-maps";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

import Stars from "../components/Stars";

const Accomodation = ({ route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error : " + error.response);
      }
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
    <View style={styles.accomodations}>
      <View>
        <Image source={{ uri: data.photos[0].url }} style={styles.img} />
        <View style={styles.priceView}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </View>
      <View style={styles.infos}>
        <View style={styles.infosLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <View style={styles.ratingView}>
            <Stars rating={data.ratingValue} />
            <Text style={styles.ratingText}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.userPicture}
          resizeMode="cover"
        />
      </View>
      <Text
        numberOfLines={!displayAllText ? 3 : null}
        style={styles.description}
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        {data.description}{" "}
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 250,
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
    width: "100%",
    padding: 15,
  },

  infosLeft: {
    width: "75%",
    marginRight: 5,
  },

  title: {
    fontSize: 20,
    marginBottom: 15,
  },

  ratingView: {
    flexDirection: "row",
  },

  ratingText: {
    color: lightGrey,
  },

  userPicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },

  description: {
    padding: 15,
    marginBottom: 10,
  },

  map: {
    width: "100%",
    height: 280,
  },
});

export default Accomodation;
