import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../assets/colors/color";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";


function SavedQuestions({route}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user } = UseAuthContext();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Tarih Bilimi ,İlk ve Orta Çağ'da Dünya", value: "Konu1" },
    { label: "İlk ve Orta Çağ'da Türk Dünyası", value: "Konu2" },
    { label: "İslam Medeniyetinin Doğuşu", value: "Konu3" },
    {
      label: "Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri",
      value: "Konu4",
    },
    { label: "Selçuklu Türkiyesi", value: "Konu5" },
    { label: "Beylikten Devlete Osmanlı Siyaseti", value: "Konu6" },
    { label: "Dünya Gücü Osmanlı", value: "Konu7" },
    { label: "Osmanlı Medeniyeti", value: "Konu8" },
    { label: "XVII. yüzyıl Osmanlı Siyaseti" , value: "Konu9"},
    { label: "Avrupa Tarihi", value: "Konu10" },
    { label: "XVIII. yüzyıl Osmanlı Siyaseti", value: "Konu11" },
    { label: "XIX. yüzyıl Osmanlı Siyaseti", value: "Konu12" },
    {
      label: "20. yüzyıl Başlarında Osmanlı Devleti ve Dünya",
      value: "Konu13",
    },
    { label: "Milli Mücadele", value: "Konu14" },
    {
      label: "Türk İnkılabı ve Atatürk Dönemi Dış Politikası",
      value: "Konu15",
    },
    {
      label: "İkinci Dünya Savaşında ve Sonrasında; Türkiye ve Dünya",
      value: "Konu16",
    },
  ]);
  const [value, setValue] = useState(items[0].value);
  const [allQuestions, setAllQuestions] = useState([]);

  const fetchFavoriteQuestions = async () => {
    try {
      const response = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/favorite?thema=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const questions = data.questions.map((question) => {
          const options = [
            question.answerA,
            question.answerB,
            question.answerC,
            question.answerD,
          ];
          const correctOption =
            options[question.correctAnswer.charCodeAt(0) - 65];
          return {
            id: question._id,
            question: question.question,
            options: options,
            correct_option: correctOption,
            thema: question.thema,
          };
        });
        setAllQuestions(questions);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFavoriteQuestions().then(() => setLoading(false));
  }, [value, isFocused]);

  const LoadingScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={COLORS.black} />
      </View>
    );
  };

  const emptyScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: COLORS.black75,
            marginTop: 20,
          }}
        >
          Favori Sorularınız Bulunmamaktadır.
        </Text>
      </View>
    );
  };

  const handleDeleteFavorite = async (id) => {
    try {
      const response = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/favorite/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchFavoriteQuestions();
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            width: 280,
            borderRadius:0,
            width:"100%",
            borderWidth: 0,
          }}
          textStyle={{
            fontSize: 14,
            fontWeight:"500",
            color: COLORS.black90,
          }}
          labelStyle={{
            fontSize: 14,
            color: COLORS.black90,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
          }}
        />
      

      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={allQuestions}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyScreen}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: COLORS.white,
                marginBottom: 10,
                padding: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.black90,
                    marginBottom: 8,
                  }}
                >
                  {item.question}
                </Text>
                {/* Add a delete button with a Material Icons icon */}
                <TouchableOpacity
                  onPress={() => handleDeleteFavorite(item.id)}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <Icon name="delete" size={25} color="crimson" />
                </TouchableOpacity>
                {/* map to render options */}
                {item.options.map((option, index) => (
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 1,
                      color:
                        option === item.correct_option
                          ? "green"
                          : COLORS.black90,
                    }}
                    key={index}
                  >
                    {option}
                  </Text>
                ))}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
              }}
            />
          )}
        />
      )}

      <View
        style={{
          flex: 1,
          paddingVertical: 5,
          backgroundColor: COLORS.white,
          alignItems: "center",
          justifyContent: "center",
        }}
      ></View>
    </View>
  );
}

export default SavedQuestions;
