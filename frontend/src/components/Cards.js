import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import COLORS from "../assets/colors/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Cards () {

    const navigation = useNavigation();

    return (
        <View style={styles.Cards}>
            <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={COLORS.black}
          style={{
            position: "absolute",
            top: 30,
            left: 20,
          }}
          onPress={() => navigation.goBack()}
        />
            <Text>Çok yakında</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Cards: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});
