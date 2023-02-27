import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../assets/colors/color";
import { MaterialIcons } from "@expo/vector-icons";
import { UseAuthContext } from "../hooks/UseAuthContext";
import * as Sharing from "expo-sharing";
import { Share } from "expo";

function Settings() {
  const navigation = useNavigation();
  const { user } = UseAuthContext();

  const handleHelpPress = () => {
    Linking.openURL("mailto:ahmetemreparmaksiz@gmail.com?subject=Help/Support");
  };

  const handleInvitePress = async () => {
    try {
      const result = await Share.share({
        message: "Check out this cool app I found! https://example.com",
      });

      if (result.action === Share.sharedAction) {
        console.log("Invitation sent successfully");
      } else {
        console.log("Invitation canceled");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleFeedbackPress = () => {
    const handleFeedbackPress = () => {
      const iOSStoreUrl = `itms-apps://itunes.apple.com/us/app/your-app-id`;

      if (Platform.OS === "ios") {
        Linking.openURL(iOSStoreUrl);
      }

      if (Platform.OS === "android") {
        Linking.openURL(androidStoreUrl);
      }
    };
  };

  const handleShare = async () => {
    try {
      const result = await Sharing.shareAsync(
        "https://expo.io/@sahilsharma/miniQuiz"
      );
      if (result.action === Sharing.sharedAction) {
        console.log("başarılı");
      } else if (result.action === Sharing.dismissedAction) {
        console.log("başarısız");
      }
    } catch (error) {
      console.log(error.message);
    }
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
          <View
            style={{
              alignItems: "center",
              marginBottom: 25,
              position: "absolute",
              right: 30,
              top: 30,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black75,
                fontWeight: "bold",
              }}
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
        <TouchableOpacity style={styles.button} onPress={handleShare}>
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
