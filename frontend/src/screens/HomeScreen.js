import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Subjects from "../components/Subjects";
import { useLogout } from "../components/Logout";
import { UseAuthContext } from "../hooks/UseAuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../assets/colors/color";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { user } = UseAuthContext();
  const { logout } = useLogout();
  console.log("user", user);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {user && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            height: 70,
            paddingVertical: 10,
            paddingHorizontal: 20,
            display: "flex",
            position: "relative",
            borderBottomColor: "#e5e5e5",
            borderBottomWidth: 2,
          }}
        >
          <Pressable onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="menu"
              style={{
                color: "black",
                fontSize: 28,
              }}
            ></MaterialCommunityIcons>
          </Pressable>
        </View>
      )}

      <ScrollView>
        <Subjects
          title="Tarih Bilimi ,İlk ve Orta Çağ'da Dünya"
          themaName="Konu1"
          colors={["#005495", "#015f9c"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          count="0"
        />

        <Subjects
          title="İlk ve Orta Çağ'da Türk Dünyası"
          themaName="Konu2"
          colors={["#f15c97", "#de4e8a"]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 1 }}
          count="1"
        />

        <Subjects
          title="İslam Medeniyetinin Doğuşu"
          themaName="Konu3"
          colors={["rgba(141,151,243,1)", "rgba(110,123,251,1)"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          count="2"
        />

        <Subjects
          title="Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri "
          themaName="Konu3"
          count="2"
          colors={["rgb(242, 112, 156)", "rgb(255, 148, 114)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
