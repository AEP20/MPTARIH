import React, { useState, useEffect} from "react";
import { View, Text, Pressable , FlatList, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../assets/colors/color";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

function SavedQuestions() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user } = UseAuthContext();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Tümü", value: "" },
    { label: "Tarih Bilimi ,İlk ve Orta Çağ'da Dünya", value: "Konu1" },
    { label: "İlk ve Orta Çağ'da Türk Dünyası", value: "Konu2" },
    { label: "İslam Medeniyetinin Doğuşu", value: "Konu3" },
    {
      label: "Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri",
      value: "Konu4",
    },
  ]);
  const [value, setValue] = useState(items[0].value);
  const [allQuestions, setAllQuestions] = useState([]);

  const fetchFavoriteQuestions = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.34:4000/api/miniQuiz/${user.email}/favorite?thema=${value}`,
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
      }else{
        console.log("error")
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
        fetchFavoriteQuestions();
    }, [value, isFocused]);

    const handleDeleteFavorite = async (id) => {
        try {
            const response = await fetch(`http://192.168.1.34:4000/api/miniQuiz/${user.email}/favorite/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
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
      <View
        style={{
          height: 85,
          borderBottomColor: "#e5e5e5",
          borderBottomWidth: 2,
          backgroundColor: COLORS.black05,
        }}
      >
        <Pressable onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons
            name="menu"
            style={{
              color: "black",
              fontSize: 28,
              position: "absolute",
              top: 35,
              left: 20,
            }}
          ></MaterialCommunityIcons>
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: "#fafafa",
          position: "absolute",
          top: 25,
          right: 10,
          zIndex: 1,
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
            backgroundColor: COLORS.black05,
            borderColor: COLORS.black50,
          }}
          textStyle={{
            fontSize: 14,
            color : COLORS.black90
          }}
          labelStyle={{
            fontSize: 14,
            color : COLORS.black90
          }}
          dropDownContainerStyle={{
            backgroundColor: COLORS.black05,
            borderWidth: 1,
            borderColor: COLORS.black50,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingVertical: 5,
          backgroundColor: COLORS.white,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
            data={allQuestions}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View
                style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 12,
                    }}
                >
                    <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                        <Text style={{fontSize: 14, color: COLORS.black90, marginBottom:8, }}>{item.question}</Text>
                        {/* Add a delete button with a Material Icons icon */}
                        <TouchableOpacity onPress={() => handleDeleteFavorite(item.id)} style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            zIndex: 1,
                        }}>
                            <Icon name="delete" size={25} color="crimson"  />
                        </TouchableOpacity>
                        {/* map to render options */}
                        {item.options.map((option, index) => (
                            <Text style={{
                            fontSize: 14,
                            marginTop:1,
                            color: option === item.correct_option ? "green" : COLORS.black90,
                            }} key={index}>
                            {option}
                            </Text>
                        ))}
                    </View>

                    </View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#CED0CE",
                }}/>
              )}
        />


      </View>
    </View>
  );
}

export default SavedQuestions;
