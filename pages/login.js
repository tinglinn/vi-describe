// HAS NOT BEEN STYLED

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
                    title="Type A"
                    onPress={() => setUserType('A')}
                    color={userType === 'A' ? '#ffffff' : '#007bff'}
                />
                <Button
                    title="Type B"
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

export default Login;
