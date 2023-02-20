import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function AboutScreen() {
  const navigation = useNavigation();

  return (
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
  );
}

export default AboutScreen;
