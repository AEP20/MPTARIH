import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ThemaScreen from "./screens/ThemaScreen";
import { UseAuthContext } from "./hooks/UseAuthContext";
import MiniQuiz from "./components/MiniQuiz";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "./screens/AboutScreen";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useLogout } from "./components/Logout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "./assets/colors/color";
import SavedQuestions from "./screens/SavedQuestions";
import SavedCards from "./screens/SavedCards";
import Settings from "./screens/Settings";
import { useNavigation } from "@react-navigation/native";
import Cards from "./components/Cards";
import { DrawerActions } from '@react-navigation/native';
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Main() {
  const { user } = UseAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user
        ? (
          <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
        ) : (
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        )}
        <Stack.Screen name="ThemaScreen" component={ThemaScreen} />
        <Stack.Screen name="MiniQuiz" component={MiniQuiz} />
        <Stack.Screen name="BilgiKartları" component={Cards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function DrawerScreen() {

  const navigation = useNavigation();
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
  
  useEffect(() => {
    console.log(value);
    navigation.navigate("Kaydedilen Sorular", {value: value});
  }, [value]);

    
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ 
        headerShown: true,
        headerTitle: "", 
        headerTintColor: COLORS.black75,
        headerLeft: () =>
     <Pressable style={{paddingLeft:24}}>
          <MaterialCommunityIcons size={28} name="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      </Pressable >
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Ana Menü" component={HomeScreen} />
      <Drawer.Screen name="Hakkımızda" component={AboutScreen} />
      <Drawer.Screen 
        name="Kaydedilen Sorular" 
        component={SavedQuestions}
        options={{ 
          headerRight: () => (
            <View style={{width:300, marginTop:3}}>
                <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              borderRadius:0,
              width:"100%",
              borderWidth: 0,
              marginBottom: 10,
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
            </View>
          ),
        }}
      />
      
      <Drawer.Screen 
        name="Kaydedilen Kartlar" 
        component={SavedCards}
        options={{ 
          headerRight: () => (
            <View style={{width:300, marginTop:3}}>
                <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              borderRadius:0,
              width:"100%",
              borderWidth: 0,
              marginBottom: 10,
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
            </View>
          ),
        }}
      />
      <Drawer.Screen name="Ayarlar" component={Settings} />
    </Drawer.Navigator>
  );
}

function DrawerContent(props) {
  const { navigation } = props;
  const { logout } = useLogout();
  const { user } = UseAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={{ flex: 1, paddingTop: 0 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>{user.email}</Text>
          <Pressable style={styles.logOut} onPress={handleLogout}>
            <MaterialCommunityIcons
              name="logout"
              style={{
                color: COLORS.black75,
                fontSize: 26,
              }}
            />
          </Pressable>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={{
          position: "absolute",
          left: 6,
          bottom: 20,
          backgroundColor: COLORS.white,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            color: COLORS.black75,
            fontSize: 13,
            lineHeight: 23,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>İçerik Yazarı:</Text> Mehmet
          Parmaksız{"\n"}
          <Text style={{ fontWeight: "bold" }}>Geliştirici:</Text> Ahmet Emre
          Parmaksız
        </Text>
      </View>
    </View>
  );
}

function AuthScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logOut: {
    backgroundColor: COLORS.white,
    paddingBottom: 5,
  },
  drawerHeader: {
    backgroundColor: "#fff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  drawerHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.black75,
  },
});
