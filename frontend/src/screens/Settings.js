import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../assets/colors/color";
import { MaterialIcons } from "@expo/vector-icons";
import { UseAuthContext } from "../hooks/UseAuthContext";

function Settings() {
  const navigation = useNavigation();
  const { user } = UseAuthContext();

  const handleHelpPress = () => {
    // Handle Help/Support button press
  };

  const handleInvitePress = () => {
    // Handle Invite Your Friends button press
  };

  const handleFeedbackPress = () => {
    // Handle Give Us Feedback button press
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          height: 70,
          paddingVertical: 10,
          paddingHorizontal: 20,
          display: "flex",
          position: "relative",
          backgroundColor: COLORS.black05,
          borderBottomColor: COLORS.black10,
          borderBottomWidth: 2,
        }}
      >
        <Pressable onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons
            name="menu"
            style={{
              color: "black",
              fontSize: 28,
            }}
          ></MaterialCommunityIcons>
        </Pressable>
        {user && (
          <View style={{ alignItems: "center", marginBottom: 25 , position:"absolute", right:30, top:30}}>
            <Text
              style={{ fontSize: 16, color: COLORS.black75, fontWeight: "bold" }}
            >
              {user.email}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.container}>
        

        <TouchableOpacity style={styles.button} onPress={handleHelpPress}>
          <Text style={styles.buttonText}>
            Yazarla / Geliştiriciyle İletişime Geç
          </Text>
          <MaterialIcons name="help" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleInvitePress}>
          <Text style={styles.buttonText}>Arkadaşlarını Davet Et</Text>
          <MaterialIcons name="person-add" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFeedbackPress}>
          <Text style={styles.buttonText}>Geri Bildirimde Bulunun</Text>
          <MaterialIcons name="feedback" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFeedbackPress}>
          <Text style={styles.buttonText}>Paylaş</Text>
          <MaterialIcons name="share" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderBottomColor: "#CED0CE",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Settings;
