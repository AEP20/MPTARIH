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
          themaName="Konu4"
          count="3"
          colors={["rgb(242, 112, 156)", "rgb(255, 148, 114)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Selçuklu Türkiyesi"
          themaName="Konu5"
          count="4"
          colors={["#A555EC", "#A833CB"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Beylikten Devlete Osmanlı Siyaseti"
          themaName="Konu6"
          count="5"
          colors={["#071A52", "#08085E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Dünya Gücü Osmanlı"
          themaName="Konu7"
          count="6"
          colors={["#FF6464", "#FF7F7F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Osmanlı Medeniyeti"
          themaName="Konu8"
          count="7"
          colors={["#2F89FC", "#82ACFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="XVII. yüzyıl Osmanlı Siyaseti"
          themaName="Konu9"
          count="8"
          colors={["#C70A80", "#BD3587"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Avrupa Tarihi"
          themaName="Konu10"
          count="9"
          colors={["#007965", "#00AF91"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="XVIII. yüzyıl Osmanlı Siyaseti"
          themaName="Konu11"
          count="10"
          colors={["#153E90", "#0E49B5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="XIX. yüzyıl Osmanlı Siyaseti"
          themaName="Konu12"
          count="11"
          colors={["#3B064D", "#8105D8"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        />
      </ScrollView>
    </View>
  );
};

// { label: "Tümü", value: "" },
//     { label: "Tarih Bilimi ,İlk ve Orta Çağ'da Dünya", value: "Konu1" },
//     { label: "İlk ve Orta Çağ'da Türk Dünyası", value: "Konu2" },
//     { label: "İslam Medeniyetinin Doğuşu", value: "Konu3" },
//     {
//       label: "Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri",
//       value: "Konu4",
//     },
//     { label: "Selçuklu Türkiyesi", value: "Konu5" },
//     { label: "Beylikten Devlete Osmanlı Siyaseti", value: "Konu6" },
//     { label: "Dünya Gücü Osmanlı", value: "Konu7" },
//     { label: "Osmanlı Medeniyeti", value: "Konu8" },
//     { label: "XVII. yüzyıl Osmanlı Siyaseti" },
//     { label: "Avrupa Tarihi", value: "Konu10" },
//     { label: "XVIII. yüzyıl Osmanlı Siyaseti", value: "Konu11" },
//     { label: "XIX. yüzyıl Osmanlı Siyaseti", value: "Konu12" },
//     {
//       label: "20. yüzyıl Başlarında Osmanlı Devleti ve Dünya",
//       value: "Konu13",
//     },
//     { label: "Milli Mücadele", value: "Konu14" },
//     {
//       label: "Türk İnkılabı ve Atatürk Dönemi Dış Politikası",
//       value: "Konu15",
//     },
//     {
//       label: "İkinci Dünya Savaşında ve Sonrasında; Türkiye ve Dünya",
//       value: "Konu16",
//     },

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
