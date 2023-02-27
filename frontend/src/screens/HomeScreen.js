import React, { useRef } from "react";
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
import { UseAuthContext } from "../hooks/UseAuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../assets/colors/color";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const { user } = UseAuthContext();
  console.log("user", user);

  const handleScrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container} >
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
                color: COLORS.black,
                fontSize: 28,
              }}
            ></MaterialCommunityIcons>
          </Pressable>

          <TouchableOpacity
            style={{ position: "absolute", top: 27, right: 25 }}
            onPress={handleScrollToBottom}
          >
            <MaterialCommunityIcons
              name="arrow-down"
              size={28}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
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
          colors={["#2C7C81", "#205E61"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          count="2"
        />

        <Subjects
          title="Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri "
          themaName="Konu4"
          count="3"
          colors={["#FF6565", "#FF4A4A"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
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
          colors={["#2F89FC", "#82ACFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Osmanlı Medeniyeti"
          themaName="Konu8"
          count="7"
          colors={["#3C2A21", "#573E32"]}
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
          colors={["#7A25B3", "#8105D8"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        />

        <Subjects
          title="20. yüzyıl Başlarında Osmanlı Devleti ve Dünya"
          themaName="Konu13"
          count="12"
          colors={["#FF1F5A", "#FF4174"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Milli Mücadele"
          themaName="Konu14"
          count="13"
          colors={["#56BBF1", "#4D77FF"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Türk İnkılabı ve Atatürk Dönemi Dış Politikası"
          themaName="Konu15"
          count="14"
          colors={["#03506F", "#276678"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <Subjects
          title="İkinci Dünya Savaşında ve Sonrasında , Türkiye ve Dünya"
          themaName="Konu16"
          count="15"
          colors={["#D75281", "#B93160"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        />

        <Subjects
          title="Karışık Deneme"
          themaName="Konu16"
          count="15"
          colors={["#F2921D", "#F49D1A"]}
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
