import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Cards () {
    return (
        <View style={styles.Cards}>
            <Text>Cards</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Cards: {
        backgroundColor: "blue",
        height: 100,
        width: "100%",
    },
});
