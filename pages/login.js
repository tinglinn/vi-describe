import React, { useState } from 'react';
import { LinearGradient, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { supabase } from '../supabase_client'
import Themes from '../assets/themes';

const LoginType = ({ navigation }) => {
    const handleLogin = (userType) => {
        navigation.navigate('Login', { userType });
    };

    return (
        <View style={[styles.container, { backgroundColor: Themes.colors.blue }]}>
            <ImageBackground source={require('../assets/images/login_logo.png')} resizeMode="cover" style={styles.loginImage} />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin('A')}>
                <Text style={styles.buttonText}>I need visual assistance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {marginBottom: 50}]} onPress={() => handleLogin('B')}>
                <Text style={styles.buttonText}>I'd like to volunteer</Text>
            </TouchableOpacity>
        </View>
    );
};

// <Text style={styles.subText}>Provide descriptions of art</Text>
// <Text style={styles.subText}>Upload an artwork you'd like described</Text>

const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailUsed, setEmailUsed] = useState(false)
    const [correctPassword, setCorrectPassword] = useState(true)
    const { userType } = route.params;
    
    const handleLogin = async () => {
        // Handle login logic here

        const { data, error } = await supabase
        .from('USERS_LIST')
        .select()
        .eq("username", email)

        console.log(data);
        if (Object.keys(data).length != 0) {
            setEmailUsed(true);
            console.log(data);
            if (data[0]['password'] != password) {
                setCorrectPassword(false)
            }
            else {
                navigation.navigate("Main", { userType, email });
            }
        }
        else {
            const { data, error } = await supabase
            .from('USERS_LIST')
            .insert(
                {username: email, password: password, usertype: userType, user_id: 1}
            )
            console.log(`Email: ${email}, Password: ${password}, User Type: ${userType}`);
            navigation.navigate("Main", { userType, email });

        }
    };
    var emailUsedAlert = (emailUsed && !correctPassword) ? <Text style={styles.userAlreadyCreatedText}> Email already in use but password incorrect!</Text> : null;
    return (
        <View style={[styles.container, {backgroundColor: Themes.colors.lightblue}]}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    keyboardType="email-address"
                />
                {emailUsedAlert}
                <Text style={styles.label}>PASSWORD</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry
                    />
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                        <Text style={styles.submitButtonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        //backgroundColor: Themes.colors.lightblue,
    },
    infoContainer: {
        //backgroundColor: Themes.colors.white,
        width: '100%',
        padding: 20,
        borderRadius: 5,
        marginBottom: 30
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        color: Themes.colors.darkblue,
        fontSize: 24,
        marginBottom: 10,
    },
    label: {
        fontFamily: "Poppins",
        color: Themes.colors.darkblue,
        fontSize: 12,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: Themes.colors.grayblue,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'whitesmoke'
    },
    loginImage: {
        marginTop: 40,
        width: '100%',
        height: '70%',
    },
    appName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: Themes.colors.white
    },
    slogan: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: Themes.colors.white
    },
    submitButton: {
        width: 140,
        height: 40,
        backgroundColor: '#276ABB',
        //padding: 10,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20
    },
    submitButtonText: {
        fontFamily: "Poppins-SemiBold",
        color: 'white',
        fontSize: 14
    },
    button: {
        width: '80%',
        height: 60,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Themes.colors.white
    },
    buttonText: {
        //color: '#ffffff',
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },
    subText: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Poppins'
    },
    userAlreadyCreatedText: {
        fontFamily: 'Poppins',
        color: '#8B0000',
        fontSize: 12,
    },
});

export { LoginType, Login };
