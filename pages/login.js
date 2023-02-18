import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { supabase } from '../supabase_client'
import Themes from '../assets/themes';


const LoginType = ({ navigation }) => {
    const handleLogin = (userType) => {
        navigation.navigate('Login', { userType });
    };

    return (
        <View style={styles.container}>
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
    const { userType } = route.params;
    
    const handleLogin = async () => {
        // Handle login logic here

        const { data, error } = await supabase
        .from('USERS_LIST')
        .select()
        .eq("username", email)


        if (Object.keys(data).length != 0) {
            setEmailUsed(true);
        }
        else {
            const { data, error } = await supabase
            .from('USERS_LIST')
            .insert(
                {username: email, password: password, usertype: userType, user_id: 1}
            )
            console.log(`Email: ${email}, Password: ${password}, User Type: ${userType}`);
            navigation.navigate("Main", { userType });

        }
    };
    var emailUsedAlert = emailUsed ? <Text style={styles.userAlreadyCreatedText}> Email already in use!</Text> : null;
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    keyboardType="email-address"
                />
                {emailUsedAlert}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry
                    />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4c80fe'
    },
    infoContainer: {
        backgroundColor: Themes.colors.white,
        width: '100%',
        padding: 20,
        borderRadius: 5,
        marginBottom: 30
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        fontFamily: "Poppins",
        fontSize: 16,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
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
