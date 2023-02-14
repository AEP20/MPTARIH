import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import COLORS from "../assets/colors/color";
import { useLogout } from "../components/Logout";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useLogout();
  const { user } = UseAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Thema}
        onPress={() =>
          navigation.navigate("ThemaScreen", { themaName: "Konu1" })
        }
      >
        <Text style={styles.themaText}>Thema 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Thema}
        onPress={() =>
          navigation.navigate("ThemaScreen", { themaName: "Konu2" })
        }
      >
        <Text style={styles.themaText}>Thema 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Thema}>
        <Text style={styles.themaText}>Thema 3</Text>
      </TouchableOpacity>

      <Pressable style={styles.logOut} onPress={handleLogout}>
        <Text style={styles.logOutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Thema: {
    height: 50,
    width: "80%",
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  themaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  logOut: {
    position: "absolute",
    bottom: 10,
    height: 40,
    width: "30%",
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logOutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default HomeScreen;
