import React from "react";
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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Main() {
  const { user } = UseAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
        ) : (
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        )}
        <Stack.Screen name="ThemaScreen" component={ThemaScreen} />
        <Stack.Screen name="MiniQuiz" component={MiniQuiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Ana Menü" component={HomeScreen} />
      <Drawer.Screen name="Hakkımızda" component={AboutScreen} />
      <Drawer.Screen name="Kaydedilen Sorular" component={SavedQuestions} />
      <Drawer.Screen name="Kaydedilen Kartlar" component={SavedCards} />
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
            fontSize: 15,
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
