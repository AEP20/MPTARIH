import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import COLORS from "../assets/colors/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

export default function Cards({ route }) {
  const jsonFiles = {
    Konu1: require("../BilgiKartlariJSON/Unit1.json"),
    Konu2: require("../BilgiKartlariJSON/Unit2.json"),
    Konu3: require("../BilgiKartlariJSON/Unit3.json"),
    Konu4: require("../BilgiKartlariJSON/Unit4.json"),
    Konu5: require("../BilgiKartlariJSON/Unit5.json"),
    Konu6: require("../BilgiKartlariJSON/Unit6.json"),
    Konu7: require("../BilgiKartlariJSON/Unit7.json"),
    Konu8: require("../BilgiKartlariJSON/Unit8.json"),
    Konu9: require("../BilgiKartlariJSON/Unit9.json"),
    Konu10: require("../BilgiKartlariJSON/Unit10.json"),
    Konu11: require("../BilgiKartlariJSON/Unit11.json"),
    Konu12: require("../BilgiKartlariJSON/Unit12.json"),
    Konu13: require("../BilgiKartlariJSON/Unit13.json"),
    Konu14: require("../BilgiKartlariJSON/Unit14.json"),
  };

  const { themaName } = route.params;
  console.log("themaName", themaName);
  const jsonData = jsonFiles[themaName];

  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height } = useWindowDimensions();

  useEffect(() => {
    const readData = async () => {
      try {
        setData(jsonData);
        setAllCards(jsonData.cards.length);
      } catch (error) {
        console.log(error);
      }
    };

    readData();
  }, [jsonData, allCards]);

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === data.cards.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? data.cards.length - 1 : currentIndex - 1
    );
  };

  return (
    <View style={styles.Cards}>
      <View></View>
      <MaterialCommunityIcons
        name="arrow-left"
        size={30}
        color={COLORS.black}
        style={{
          position: "absolute",
          top: 42,
          left: 20,
        }}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          position: "absolute",
          top: 32,
          right: 10,
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16,
            fontWeight: "bold",
            paddingRight: 5,
            position: "absolute",
            top: 20,
            right: 50,
          }}
        >
          {currentIndex + 1}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16,
            fontWeight: "bold",
            paddingLeft: 5,
            position: "absolute",
            top: 20,
            right: 25,
          }}
        >
          {`/ ${allCards}`}
        </Text>
      </View>

      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: 180,
          paddingLeft: 15,
        }}
      >
        {data && (
          <View>
            <View
              style={{
                width: "95%",
                display: "flex",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: height / 47 }}>
                {data.cards[currentIndex].title}
              </Text>
              {data.cards[currentIndex].content.map((item, index) => (
                <Text
                  key={index}
                  style={{ marginTop: 8, fontSize: height / 48 }}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={handleNext}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: 75,
          width: "50%",
          backgroundColor: "#007AFF",
          display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 20,

        }}
      >
        <MaterialCommunityIcons
          name="menu-right"
          size={60}
          color={COLORS.white}
          
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePrevious}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 75,
          width: "50%",
          backgroundColor: "#007AFF",
          display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 20,
        }}
      >
        <MaterialCommunityIcons
          name="menu-left"
          size={60}
          color={COLORS.white}
          
        ></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Cards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
