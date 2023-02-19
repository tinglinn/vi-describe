import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Themes from '../assets/themes';

export default function SubmitButton({childFunction}) {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity style={styles.submitButton} onPress={() => childFunction ()}>
                <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
})
