// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { supabase } from '../supabase_client'
// import Themes from '../assets/themes';


// const LoginType = ({ navigation }) => {
//     const handleLogin = (userType) => {
//         navigation.navigate('Login', { userType });
//     };

//     return (
//         <View style={styles.container}>
//             <ImageBackground source={require('../assets/images/login_logo.png')} resizeMode="cover" style={styles.loginImage} />
//             <TouchableOpacity style={[styles.button, styles.buttonA]} onPress={() => handleLogin('A')}>
//                 <Text style={styles.buttonText}>I need visual assistance</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.button, styles.buttonB]} onPress={() => handleLogin('B')}>
//                 <Text style={styles.buttonText}>I'd like to volunteer</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// // <Text style={styles.subText}>Provide descriptions of art</Text>
// // <Text style={styles.subText}>Upload an artwork you'd like described</Text>

// const Login = ({ navigation, route }) => {
//     const [email, setEmail] = useState('');
//     const [password_input, setPassword] = useState('');
//     const [emailUsed, setEmailUsed] = useState(false)
//     const [passwordUsed, setPasswordUsed] = useState(false);
//     const { userType } = route.params;
    
//     const handleLogin = async () => {
//         // Handle login logic here

//         const { data, error } = await supabase
//         .from('USERS_LIST')
//         .select('password')
//         .eq('username', email)
//         //console.log(Object.keys(data))
//         console.log(data)
//         //console.log(typeof(data))
//         if (Object.keys(data).length != 0) {
//             //setEmailUsed(true);
//             console.log(data.password)
//             console.log(password_input)
//             if (data.password != password_input) {
//                 //console.log("incorrect password!")
                
//                 setPasswordUsed(true);
//             }
//             else {
//                 navigation.navigate("Main", { userType });
//             }
            
//         }

//         // creates new username/password combo in database
//         else {
//             const { data, error } = await supabase
//             .from('USERS_LIST')
//             .insert(
//                 {username: email, password: password, usertype: userType, user_id: 1}
//             )
//             console.log(`Email: ${email}, Password: ${password}, User Type: ${userType}`);
//             navigation.navigate("Main", { userType });

//         }
//     };
//     var incorrectPasswordAlert = passwordUsed ? <Text style={styles.userAlreadyCreatedText}> Incorrect Password!</Text> : null;
//     //var emailUsedAlert = emailUsed ? <Text style={styles.userAlreadyCreatedText}> Email already in use!</Text> : null;
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login</Text>
//             <Text style={styles.label}>Email</Text>
//             {incorrectPasswordAlert}
//             <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter email"
//                 keyboardType="email-address"
//             />
            
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//                 style={styles.input}
//                 value={password_input}
//                 onChangeText={setPassword}
//                 placeholder="Enter password"
//                 secureTextEntry
//             />
//             <Button title="Login" style={styles.button} onPress={handleLogin}  />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         backgroundColor: '#4c80fe'
//     },
//     title: {
//         fontFamily: "Poppins",
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     label: {
//         fontFamily: "Poppins",
//         fontSize: 16,
//         marginTop: 20,
//         alignSelf: 'flex-start',
//     },
//     input: {
//         width: '100%',
//         height: 40,
//         borderColor: '#cfcfcf',
//         borderWidth: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 20,
//         backgroundColor: 'whitesmoke'
//     },
//     loginImage: {
//         width: '100%',
//         height: '70%'
//     },
//     appName: {
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 24,
//         color: Themes.colors.white
//     },
//     slogan: {
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 24,
//         color: Themes.colors.white
//     },
//     button: {
//         width: '80%',
//         height: 60,
//         borderRadius: 7,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     buttonA: {
//         //backgroundColor: '#007bff',
//         backgroundColor: Themes.colors.white,
//     },
//     buttonB: {
//         //backgroundColor: '#dc3545',
//         backgroundColor: Themes.colors.white,
//     },
//     buttonText: {
//         //color: '#ffffff',
//         color: '#000000',
//         fontSize: 18,
//         fontFamily: 'Poppins-SemiBold'
//     },
//     subText: {
//         color: '#000000',
//         fontSize: 14,
//         fontFamily: 'Poppins'
//     },
//     userAlreadyCreatedText: {
//         color: 'red',
//         fontSize: 9,
//     },
// });

// export { LoginType, Login };

/*
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../supabase_client';


const Login = () => {
    const [email, setEmail] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [userType, setUserType] = useState('');

    const handleLogin = async () => {
        // Handle login logic here
        const { data, error } = await supabase 
        .from('USERS_LIST')
        .insert(
            { username: email, user_id: 1, password: passphrase, usertype: userType },
        );
        console.log(data, error)
        console.log(`Email: ${email}, Passphrase: ${passphrase}, User Type: ${userType}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select User Type</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="I need visually assistance"
                    onPress={() => setUserType('A')}
                    color={userType === 'A' ? '#ffffff' : '#007bff'}
                />
                <Button
                    title="I'd like to volunteer"
                    onPress={() => setUserType('B')}
                    color={userType === 'B' ? '#ffffff' : '#007bff'}
                />
            </View>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={passphrase}
                onChangeText={setPassphrase}
                placeholder="Enter passphrase"
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
});

export default Login;*/

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
            <TouchableOpacity style={[styles.button, styles.buttonA]} onPress={() => handleLogin('A')}>
                <Text style={styles.buttonText}>I need visual assistance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonB]} onPress={() => handleLogin('B')}>
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
            <Text style={styles.title}>Login</Text>
            <Text style={styles.label}>Email</Text>
            {emailUsedAlert}
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
            />
            
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
            />
            <Button title="Login" style={styles.button} onPress={handleLogin}  />
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
    title: {
        fontFamily: "Poppins",
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
        width: '100%',
        height: '70%'
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
    },
    buttonA: {
        //backgroundColor: '#007bff',
        backgroundColor: Themes.colors.white,
    },
    buttonB: {
        //backgroundColor: '#dc3545',
        backgroundColor: Themes.colors.white,
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
        color: 'red',
        fontSize: 9,
    },
});

export { LoginType, Login };
