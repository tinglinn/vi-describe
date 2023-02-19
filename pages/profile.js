import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '@react-navigation/native';
import Themes from '../assets/themes';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

export default function UserInfoPage({ navigation, route }) {
    const { userType } = route.params;

    const [name, setName] = useState("Jennifer Zhou");
    const [location, setLocation] = useState("Sacremento, CA");
    const [email, setEmail] = useState("jzhou@gmail.com");
    const [bio, setBio] = useState("Adventurous art-lover, dog mom");
    //const [dob, setDOB] = useState("Adventurous art-lover, dog mom");

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/images/profile.png')} style={styles.image}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location}</Text>
                <View style={{ position: 'absolute', right: 10, bottom: 40, borderWidth: 1, borderColor: Themes.colors.darkblue, width: 35, aspectRatio: 1, borderRadius: 50, backgroundColor: 'rgba(255,255,255, 0.3)', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="add-photo-alternate" size={22} color={Themes.colors.darkblue} />
                </View>
            </ImageBackground>
            <View style={styles.infoBox}>
                <Text style={styles.prompt}>ABOUT ME *</Text>
                <View style={styles.input}>
                    <Text style={styles.prompt}>{bio} </Text>
                    <TouchableOpacity >
                        <AntDesign name="edit" size={18} color={Themes.colors.darkblue} />
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.prompt}>I AM: * </Text>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 0.85, justifyContent: 'space-between'}}>
                    <TouchableOpacity><View style={userType == 'A' ? styles.selectedbutton : styles.otherbutton}><Text style={userType == 'A' ? styles.whiteprompt : styles.prompt}>VISUALLY IMPAIRED</Text></View></TouchableOpacity>
                    <TouchableOpacity><View style={userType == 'B' ? styles.selectedbutton : styles.otherbutton}><Text style={userType == 'B' ? styles.whiteprompt : styles.prompt}>VOLUNTEER</Text></View></TouchableOpacity>
                </View>
                <Text style={styles.prompt}>EMAIL *</Text>
                <View style={styles.input}>
                    <Text style={styles.prompt}>{email}</Text>
                    <AntDesign name="edit" size={18} color={Themes.colors.darkblue} />
                </View>
                <Text style={styles.prompt}>DATE OF BIRTH *</Text>
                <View style={styles.input}>
                    <Text style={styles.prompt}>08/27/1990</Text>
                    <FontAwesome name="calendar-o" size={18} color={Themes.colors.darkblue} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.lightblue
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 0.7,
        zIndex: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 35,
    },
    infoBox: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        borderRadius: 20,
        //flex: 1,
        width: Dimensions.get('window').width,
        height: '65%',
        backgroundColor: Themes.colors.background,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 30
    },
    prompt: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        color: Themes.colors.darkblue,
    },
    whiteprompt: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        color: Themes.colors.white,
    },
    input: {
        width: Dimensions.get('window').width * 0.85,
        minHeight: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#6F87A4',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 14,
        fontFamily: 'Poppins',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    selectedbutton: {
        borderRadius: 20,
        width: 160,
        height: 50,
        backgroundColor: Themes.colors.darkblue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherbutton: {
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: Themes.colors.darkblue,
        width: 160,
        height: 50,
        backgroundColor: Themes.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        //marginTop: 10,
        //marginBottom: 5,
        color: Themes.colors.white,
    },
    location: {
        fontFamily: 'Poppins',
        fontSize: 16,
        //marginTop: 10,
        //marginBottom: 5,
        color: Themes.colors.white,
    }
});