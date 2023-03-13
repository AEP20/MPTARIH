import React, {useState} from 'react'
import { View, Text , Pressable, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../assets/colors/color'
import { UseAuthContext } from '../hooks/UseAuthContext'



function SavedCards() {
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