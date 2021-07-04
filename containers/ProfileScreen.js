import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";

import InputText from "../components/InputText";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

export default function ProfileScreen({ setToken, userToken, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState();

  const handlePressLogOut = () => {
    setToken(null, null);
  };

  const handlePressUpdate = () => {
    const response = axios.put(
      `https://express-airbnb-api.herokuapp.com/user/update`,
      {
        username: username,
        email: email,
        description: description,
      },
      { headers: { authorization: `Bearer ${userToken}` } }
    );
  };

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );

        setDescription(response.data.description);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setAvatar(response.data.photo);
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
    <View style={styles.screen}>
      <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={
            avatar
              ? avatar
              : "https://res.cloudinary.com/pauline-cloudinary/image/upload/v1620827790/usefull/no-avatar-profile_rrhqfo.jpg"
          }
        />
      </View>
      <InputText
        placeholderText={"email"}
        secureBoolean={false}
        value={email}
        setValue={setEmail}
      />
      <InputText
        placeholderText={"username"}
        secureBoolean={false}
        value={username}
        setValue={setUsername}
      />
      <TextInput
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        value={description}
        placeholder="Describe yourself in a few words ..."
        onChangeText={(str) => {
          setDescription(str);
        }}
        style={styles.descriptionInput}
      />

      <TouchableOpacity
        onPress={handlePressUpdate}
        style={[styles.update, styles.button]}
      >
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressLogOut}
        style={[styles.logout, styles.button]}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    paddingTop: 25,
  },

  avatarView: {
    borderRadius: 60,
    borderColor: salmon,
    borderWidth: 2,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  avatar: {
    width: 80,
    height: 80,
  },

  activityIndicator: {
    marginTop: 50,
  },

  descriptionInput: {
    width: "80%",
    height: 120,
    borderColor: lightSalmon,
    borderWidth: 1,
    padding: 5,
    marginVertical: 20,
  },

  button: {
    width: "60%",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  update: {
    borderColor: salmon,
    borderStyle: "solid",
    borderWidth: 2,
    marginBottom: 20,
  },

  updateText: {
    color: darkGrey,
    fontSize: 16,
    fontWeight: "bold",
  },

  logout: {
    backgroundColor: salmon,
  },

  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
