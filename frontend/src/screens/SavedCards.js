import React, {useState} from 'react'
import { View, Text , Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../assets/colors/color'
import DropDownPicker from 'react-native-dropdown-picker';
import { UseAuthContext } from '../hooks/UseAuthContext'



function SavedCards() {

    const { user } = UseAuthContext();
    const navigation = useNavigation()


    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Tümü", value: "" },
        { label: "Tarih Bilimi ,İlk ve Orta Çağ'da Dünya", value: "konu1" },
        { label: "İlk ve Orta Çağ'da Türk Dünyası", value: "konu2" },
        { label: "İslam Medeniyetinin Doğuşu", value: "konu3" },
        {
            label: "Türklerin İslamiyet'i Kabulü, İlk Türk İslam Devletleri",
            value: "konu4",
        },
        ]);
  const [value, setValue] = useState(items[0].value);




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
            fontSize: 12,
          }}
          labelStyle={{
            fontSize: 12,
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
          backgroundColor: "black",
          position: "absolute",
          top: 25,
          right: 10,
          zIndex: 1,
        }}
      >
    </View>
    </View>
  )
}

export default SavedCards