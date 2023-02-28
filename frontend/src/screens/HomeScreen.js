import React, { useRef, useEffect, useState } from "react";
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
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();

  const [solvedCount, setSolvedCount] = useState([]);
  const [count, setCount] = useState([]);

  const { user } = UseAuthContext();
  console.log("user", user);

  const handleScrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const fetchSolved = async () => {
    try {
      const res = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/solved`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const fetchData = await res.json();
      setSolvedCount(fetchData.solvedThemas);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/count",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const fetchData = await response.json();
      setCount(fetchData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user){
      fetchSolved();
      fetchQuestions();
    }
  }, [isFocused]);


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
          solvedCount={solvedCount[0]}
          allQuestions={count[0]}
          count="0"
        />

        <Subjects
          title="İlk ve Orta Çağ'da Türk Dünyası"
          themaName="Konu2"
          colors={["#f15c97", "#de4e8a"]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 1 }}
          count="1"
          solvedCount={solvedCount[1]}
          allQuestions={count[1]}

        />

        <Subjects
          title="İslam Medeniyetinin Doğuşu"
          themaName="Konu3"
          colors={["#2C7C81", "#205E61"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          count="2"
          solvedCount={solvedCount[2]}
          allQuestions={count[2]}
        />

        <Subjects
          title="Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri "
          themaName="Konu4"
          count="3"
          colors={["#FF6565", "#FF4A4A"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
          solvedCount={solvedCount[3]}
          allQuestions={count[3]}

        />

        <Subjects
          title="Selçuklu Türkiyesi"
          themaName="Konu5"
          count="4"
          colors={["#A555EC", "#A833CB"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
          solvedCount={solvedCount[4]}
          allQuestions={count[4]}
        />

        <Subjects
          title="Beylikten Devlete Osmanlı Siyaseti"
          themaName="Konu6"
          count="5"
          colors={["#071A52", "#08085E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[5]}
          allQuestions={count[5]}
        />

        <Subjects
          title="Dünya Gücü Osmanlı"
          themaName="Konu7"
          count="6"
          colors={["#2F89FC", "#82ACFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[6]}
          allQuestions={count[6]}
        />

        <Subjects
          title="Osmanlı Medeniyeti"
          themaName="Konu8"
          count="7"
          colors={["#3C2A21", "#573E32"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[7]}
          allQuestions={count[7]}
        />

        <Subjects
          title="XVII. yüzyıl Osmanlı Siyaseti"
          themaName="Konu9"
          count="8"
          colors={["#C70A80", "#BD3587"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[8]}
          allQuestions={count[8]}
        />

        <Subjects
          title="Avrupa Tarihi"
          themaName="Konu10"
          count="9"
          colors={["#007965", "#00AF91"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[9]}
          allQuestions={count[9]}
        />

        <Subjects
          title="XVIII. yüzyıl Osmanlı Siyaseti"
          themaName="Konu11"
          count="10"
          colors={["#153E90", "#0E49B5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[10]}
          allQuestions={count[10]}
        />

        <Subjects
          title="XIX. yüzyıl Osmanlı Siyaseti"
          themaName="Konu12"
          count="11"
          colors={["#7A25B3", "#8105D8"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
          solvedCount={solvedCount[11]}
          allQuestions={count[11]}
        />

        <Subjects
          title="20. yüzyıl Başlarında Osmanlı Devleti ve Dünya"
          themaName="Konu13"
          count="12"
          colors={["#FF1F5A", "#FF4174"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[12]}
          allQuestions={count[12]}
        />

        <Subjects
          title="Milli Mücadele"
          themaName="Konu14"
          count="13"
          colors={["#56BBF1", "#4D77FF"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
          solvedCount={solvedCount[13]}
          allQuestions={count[13]}
        />

        <Subjects
          title="Türk İnkılabı ve Atatürk Dönemi Dış Politikası"
          themaName="Konu15"
          count="14"
          colors={["#03506F", "#276678"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[14]}
          allQuestions={count[14]}
        />

        <Subjects
          title="İkinci Dünya Savaşında ve Sonrasında , Türkiye ve Dünya"
          themaName="Konu16"
          count="15"
          colors={["#D75281", "#B93160"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
          solvedCount={solvedCount[15]}
          allQuestions={count[15]}
        />

        <Subjects
          title="Karışık Deneme"
          themaName="Konu16"
          count="15"
          colors={["#F2921D", "#F49D1A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          solvedCount={solvedCount[16]}
          allQuestions={count[16]}
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
