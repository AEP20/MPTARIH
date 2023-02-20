import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../assets/colors/color";

function SavedQuestions() {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tümü", value: "all" },
    { label: "Tarih Bilimi ,İlk ve Orta Çağ'da Dünya", value: "konu1" },
    { label: "İlk ve Orta Çağ'da Türk Dünyası", value: "konu2" },
    { label: "İslam Medeniyetinin Doğuşu", value: "konu3" },
    {
      label: "Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri",
      value: "konu4",
    },
  ]);

  

  return (
    <View
      style={{
        height: 70,
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
            position: "absolute",
            top: 25,
            left: 20,
          }}
        ></MaterialCommunityIcons>
      </Pressable>

      <View style ={{
        backgroundColor: "#fafafa",
        position: "absolute",
        top : 80,
        right : 10,
      }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style = {{
            width: 200,
            backgroundColor: "fafafa",
            borderColor: COLORS.black50,

          }}
          textStyle={{
            fontSize: 12,
          }}
          labelStyle={{
            fontSize: 12,

          }}
          dropDownContainerStyle={{
            backgroundColor: "fafafa",
            borderWidth: 1,
            borderColor: COLORS.black50,
            
            }}
        />
      </View>


    </View>
  );
}

export default SavedQuestions;
