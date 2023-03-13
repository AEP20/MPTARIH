import React, {useState} from 'react'
import { View, Text , Pressable, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../assets/colors/color'
import { UseAuthContext } from '../hooks/UseAuthContext'
import DropDownPicker from 'react-native-dropdown-picker';



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
      
      
    </View>
  )
}

export default SavedCards