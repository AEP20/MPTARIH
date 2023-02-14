import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ThemaScreen from "./screens/ThemaScreen";
import { UseAuthContext } from "./hooks/UseAuthContext";
import MiniQuiz from "./components/MiniQuiz";

const Stack = createNativeStackNavigator();

export default function Main() {
  const { user } = UseAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
          <Stack.Screen name="ThemaScreen" component={ThemaScreen} />
          <Stack.Screen name="MiniQuiz" component={MiniQuiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
