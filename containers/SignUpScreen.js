import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import InputText from "../components/InputText";
import SubmitButton from "../components/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const deviceHeight = Dimensions.get("window").height;

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [error, setError] = useState(0);
  // error = 0 --> no problem
  // error = 1 --> missing parameter
  // error = 3 --> other error
  // error = 4 --> password and verifPassword are different
  // error = 5 --> email already in DB
  // error : 6 --> username already in DB

  const handlePressSubmit = async () => {
    setError(0);
    if (email && username && description && password && verifPassword) {
      if (password === verifPassword) {
        setIsLoading(true);
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          setToken(response.data.token);
        } catch (error) {
          console.log(error.response.data.error);
          if (
            error.response.data.error ===
            "This username already has an account."
          ) {
            setError(6);
          } else if (
            error.response.data.error === "This email already has an account."
          ) {
            setError(5);
          } else {
            setError(3);
          }
        }
        setIsLoading(false);
      } else {
        setError(4);
      }
    } else {
      setError(1);
    }
  };

  const navigation = useNavigation();

  const handlePressIcon = () => {
    setPasswordHidden(!passwordHidden);
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar style="dark" />
        <View style={styles.screen}>
          <View style={styles.mainSections}>
            <Image
              source={require("../assets/picto-airbnb.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Sign Up</Text>
            {isLoading && (
              <ActivityIndicator
                color={salmon}
                size="large"
                style={styles.activityIndicator}
              />
            )}
          </View>
          <View style={styles.mainSections}>
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
            <View style={styles.descriptionInputArea}>
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
            </View>
            <InputText
              placeholderText={"password"}
              secureBoolean={passwordHidden}
              value={password}
              setValue={setPassword}
            />
            {passwordHidden ? (
              <FontAwesome5
                name="eye"
                size={18}
                color={salmon}
                style={styles.iconEye}
                onPress={handlePressIcon}
              />
            ) : (
              <FontAwesome5
                name="eye-slash"
                size={18}
                color={salmon}
                style={styles.iconEye}
                onPress={handlePressIcon}
              />
            )}
            <InputText
              placeholderText={"confirm password"}
              secureBoolean={passwordHidden}
              value={verifPassword}
              setValue={setVerifPassword}
            />
          </View>
          <View style={styles.mainSections}>
            <ErrorMessage error={error} />
            <SubmitButton
              buttonRole="Sign Up"
              handlePress={handlePressSubmit}
              isLoading={isLoading}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have an account ? Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "white",
    flex: 1,
  },

  screen: {
    alignItems: "center",
  },

  mainSections: {
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },

  logo: {
    width: 150,
    height: 180,
  },

  title: {
    color: darkGrey,
    fontSize: 24,
  },

  descriptionInputArea: {
    width: "80%",
    height: 120,
    borderColor: lightSalmon,
    borderWidth: 1,
    padding: 5,
    marginVertical: 20,
  },

  redirectionText: {
    color: lightGrey,
  },

  activityIndicator: {
    marginTop: 5,
  },

  iconEye: {
    position: "absolute",
    bottom: 20,
    right: 40,
  },
});
