import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const AroundMe = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitutde] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPermissionLocation = async () => {
      try {
        const result = await Location.requestForegroundPermissionsAsync();
        console.log(result);

        let response;
        if (result.status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          console.log(location.coords.latitude);
          console.log(location.coords.longitude);
          setLatitude(location.coords.latitude);
          setLongitutde(location.coords.longitude);
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPermissionLocation();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      color={salmon}
      size="large"
      style={styles.activityIndicator}
    />
  ) : (
    <MapView
      initialRegion={{
        latitude: latitude ? latitude : 48.866667,
        longitude: longitude ? longitude : 2.333333,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
      style={styles.map}
    >
      {data.map((item) => {
        return (
          <MapView.Marker
            key={item._id}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});

export default AroundMe;
