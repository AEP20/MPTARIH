import React from "react";
import { Text, View , StyleSheet, TouchableOpacity} from "react-native";
import MiniQuiz from "../components/MiniQuiz";
import Cards from "../components/Cards";
import { useNavigation } from "@react-navigation/native";

export default function ThemaScreen({ route}) {

    const navigation = useNavigation();
    const {themaName} = route.params;

    return (
        <View>
            <Text style={style.title}>{themaName}</Text>
            <TouchableOpacity style={style.quiz} onPress={() => navigation.navigate("MiniQuiz", { themaName: themaName })}>
                <Text>MiniQuiz</Text>
            </TouchableOpacity>
            <Cards />
        </View>
    );
}

const style = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    }, 
    quiz : {
        backgroundColor: "red",
        height: 100,
        width: "100%",
    }
})