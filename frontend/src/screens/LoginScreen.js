import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import COLORS from "../assets/colors/color";
import Login from "../components/Login";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, loading } = Login();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <LinearGradient
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 270,
            width: "100%",
            overflow: "hidden",
          }}
          colors={["#FF6E31", "#FF597B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View
            style={{
              position: "absolute",
              bottom: -100,
              left: 0,
              width: "100%",
              height: 200,
              borderTopLeftRadius: 200,
              borderTopRightRadius: 200,
              backgroundColor: "#FFF",
            }}
          />
        </LinearGradient>

        <Text style={{
            color: COLORS.white,
            fontSize: 32,
            fontWeight: "bold",
            display: "flex",
            position: "absolute",
            top: 100,

        }}>Giriş Yap</Text>

        <View style={{
            flex: 1,
            width: "100%",
            marginTop: 170,
            padding: 20,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",



        }}>


        <View style={styles.sub_container}>
          <Text style={styles.input_title}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.sub_container}>
          <Text style={styles.input_title}>Şifre</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
            
          style={styles.button}
          onPress={() => signIn({ email, password })}
          disabled={loading}
        >
            <LinearGradient
                colors={["#FF6E31", "#FF597B"]}
                end = {{x: 0, y: 0}}
                start = {{x: 1, y: 1}}        
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                }}

            >
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.loginText}>Hesabın yok mu ? Kayıt Ol</Text>
        </TouchableOpacity>

        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 30,
    color: COLORS.black75,
  },
  sub_container: {
    height: "14%",
    marginBottom: 30,
  },
  input_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black75,
  },
  input: {
    height: 45,
    width: 300,
    borderColor: COLORS.black25,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 10,
    marginTop: 5,
  },
  button: {
    height: 50,
    width: 170,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black75,
    marginTop: 20,
  },
  error: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.red,
    marginTop: 20,
  },
});

export default LoginScreen;
