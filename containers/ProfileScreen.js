import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";

import InputText from "../components/InputText";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

export default function ProfileScreen({ setToken, userToken, userId }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(data.email || null);

  const handlePressLogOut = () => {
    setToken(null, null);
  };

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fecthData();
  }, []);
  return isLoading ? (
    <ActivityIndicator
      color={salmon}
      size="large"
      style={styles.activityIndicator}
    />
  ) : (
    <View>
      <Text>Profile</Text>
      <Image
        style={styles.avatar}
        source={
          data.photo
            ? data.photo
            : "https://res.cloudinary.com/pauline-cloudinary/image/upload/v1620827790/usefull/no-avatar-profile_rrhqfo.jpg"
        }
      />
      <InputText
        placeholderText={"email"}
        secureBoolean={false}
        value={email}
        setValue={setEmail}
      />
      <TouchableOpacity onPress={handlePressLogOut}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
