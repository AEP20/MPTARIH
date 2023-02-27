import React, { useState, useEffect, useMemo} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import COLORS from "../assets/colors/color";
import { useLogout } from "../components/Logout";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useIsFocused } from '@react-navigation/native';


function Subjects(data) {
  const [count, setCount] = useState([]);
  const [solvedCount, setSolvedCount] = useState([]);
  const { user } = UseAuthContext();
  const isFocused = useIsFocused();
  const navigation = useNavigation();


  useEffect(() => {
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
        const counts = fetchData.questionCounts.map((item) => item.count);
        setCount(counts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const fetchSolved = async () => {
      try {
        const res = await fetch(
          `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/solved?thema=${data.count}`,
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

    if (isFocused) {
        fetchSolved();
      }
  }, [ isFocused ]);


  const progress = useMemo(() => {
    const allQuestions = count[data.count];
    return (solvedCount / allQuestions) * 100;
  }, [count, data.count, solvedCount]);


  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.Thema}
        colors={data.colors}
        start={data.start}
        end={data.end}
      >
        <Text style={styles.themaText}>{data.title}</Text>

        <View
          style={{
            position: "absolute",
            bottom: 45,
            left: 0,
            height: 5,
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 5,
              backgroundColor: "green",
              width: `${progress}%`,
            }}
          ></View>
        </View>

        <View style={styles.bottom_container}>
          <View style={styles.bottom_left_container}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("bilgiKartları", {
                  themaName: data.themaName,
                  colors: data.colors,
                  start: data.start,
                  end: data.end,
                  title: data.title,
                })
              }
            >
              <MaterialCommunityIcons
                name="sync"
                style={{
                  color: COLORS.white,
                  fontSize: 30,
                  position: "absolute",
                  left: 10,
                  top: 10,
                }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                  position: "absolute",
                  left: 50,
                  top: 15,
                  fontWeight: "bold",
                }}
              >
                Bilgi Kartları
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom_right_container}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() =>
                navigation.navigate("MiniQuiz", {
                  themaName: data.themaName,
                  colors: data.colors,
                  start: data.start,
                  end: data.end,
                  title: data.title,
                })
              }
            >
              <MaterialCommunityIcons
                name="arrow-right"
                style={{
                  color: COLORS.white,
                  fontSize: 30,
                  position: "absolute",
                  right: 10,
                  top: 10,
                }}
              />

              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                  position: "absolute",
                  right: 50,
                  top: 15,
                  fontWeight: "bold",
                }}
              >
                Mini Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    paddingVertical:1,
    marginTop: 5,
  },
  Thema: {
    height: 110,
    width: "100%",
    borderRadius: 5,
    position: "relative",
    
  },
  touchable: {
    height: "100%",
    width: "100%",
  },
  bottom_container: {
    position: "absolute",
    bottom: 0,
    height: 50,
    width: "100%",
  },
  bottom_left_container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
    width: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bottom_right_container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "100%",
    width: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  themaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default Subjects;
