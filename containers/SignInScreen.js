import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";

import InputText from "../components/InputText";
import SubmitButton from "../components/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";

import colors from "../assets/colors";
const { darkGrey, lightGrey, salmon, lightSalmon } = colors;

const deviceHeight = Dimensions.get("window").height;

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [error, setError] = useState(0);
  // error = 0 --> no problem
  // error = 1 --> missing parameter
  // error = 2 --> wrong in email and/or password
  // error = 3 --> other error

  const navigation = useNavigation();

  const handlePress = async () => {
    setError(0);
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password }
        );

        alert("You are now logged in!");
      } catch (error) {
        if (error.response.status === 401) {
          setError(2);
        } else {
          setError(3);
        }
      }
    } else {
      setError(1);
    }
    setIsLoading(false);
  };

  const handlePressIcon = () => {
    setPasswordHidden(!passwordHidden);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <StatusBar style="dark" />
        <View style={styles.screen}>
          <View style={styles.mainSections}>
            <Image
              source={require("../assets/picto-airbnb.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Sign In</Text>
            {isLoading && (
              <ActivityIndicator
                color={salmon}
                size="large"
                style={styles.activityIndicator}
              />
            )}
            <Text style={styles.error}>{isLoading}</Text>
          </View>
          <View style={styles.mainSections}>
            <InputText
              placeholderText="email"
              secureBoolean={false}
              value={email}
              setValue={setEmail}
            />
            <InputText
              placeholderText="password"
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
          </View>
          <View style={styles.mainSections}>
            <ErrorMessage error={error} />
            <SubmitButton
              buttonRole={"Sign Up"}
              handlePress={handlePress}
              isLoading={isLoading}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={styles.redirection}
            >
              <Text style={styles.redirectionText}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "white",
    flex: 1,
  },

  screen: {
    height: deviceHeight,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
  },

  mainSections: {
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: 150,
    height: 180,
  },

  title: {
    color: darkGrey,
    fontSize: 24,
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
