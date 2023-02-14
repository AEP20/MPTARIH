import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback,Keyboard,TouchableOpacity } from 'react-native';
import COLORS from '../assets/colors/color';
import Login from '../components/Login';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, error, loading } = Login();


    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>

            <View style={styles.sub_container}>
                <Text style={styles.input_title}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.sub_container}>
                <Text style={styles.input_title}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => signIn({email, password})} disabled={loading}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate("RegisterScreen")}>
                <Text style={styles.loginText}>Hesabın yok mu? Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems:"flex-start",
        justifyContent:"center",
        marginBottom:30,
        color: COLORS.black75,
    },
    sub_container: {
        height:"14%",
        marginBottom: 5,
    },
    input_title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black75,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: COLORS.black75,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
    },
    button: {
        height: 40,
        width: 300,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black75,
        marginTop: 20,
    },
    error: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.red,
        marginTop: 20,
    },

});


export default LoginScreen;