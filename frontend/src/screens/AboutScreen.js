import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../assets/colors/color";

function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          height: "11%",
          paddingVertical: 10,
          paddingHorizontal: 20,
          display: "flex",
          position: "relative",
          borderBottomColor: COLORS.black10,
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

      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: COLORS.black90,
            lineHeight: 28,
          }}
        >
          Bağımsız geliştirici tarafından yapılan YKS odaklı tarih dersi
          uygulamasıdır. Kullanıcı dostu arayüz hedefiyle reklam alınmadı.
          Bağımsız geliştiriciye destek olmak ve 300 soru içeren premium paketi
          satın alabilirsiniz.
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: COLORS.black90,
            lineHeight: 28,
            marginTop: 20,
          }}
        >
          Premium Özellikler
        </Text>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <MaterialCommunityIcons
            name="check"
            style={{
              color: COLORS.black90,
              fontSize: 24,
            }}
          ></MaterialCommunityIcons>
          <View>
            <Text
              style={{
                color: COLORS.black90,
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Her konu için 20, toplam 300 soru
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <MaterialCommunityIcons
            name="check"
            style={{
              color: COLORS.black90,
              fontSize: 24,
            }}
          ></MaterialCommunityIcons>
          <View>
            <Text
              style={{
                color: COLORS.black90,
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Açık kaynak kod
            </Text>
          </View>
        </View>
      </View>

      <LinearGradient
        style={{
          position: "absolute",
          bottom: 0,
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
            bottom: 70,
            left: 0,
            width: "100%",
            height: 200,
            borderBottomLeftRadius: 300,
            borderBottomRightRadius: 300,
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 40,
            alignItems: "center",
          }}
        >
          <LinearGradient
            style={{
              backgroundColor: "red",
              width: 150,
              height: 50,
              zIndex: 1,
              borderRadius: 30,
            }}
            colors={["#FF6E31", "#FF597B"]}
            end={{ x: 0, y: 0 }}
            start={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              style={{
                height: "100%",
                width: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Buton
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
    </View>
  );
}

export default AboutScreen;
