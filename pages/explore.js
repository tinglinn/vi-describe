import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions, Text, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/themes';
import { Foundation } from '@expo/vector-icons'; 

import GalleryScreen from './gallery';
import YourFeedScreen from './yourfeed';

export default function ExplorePage ({navigation, route}) {
    const [showFirstPage, setShowFirstPage] = useState(true);
    const toggleSwitch = () => setShowFirstPage(previousState => !previousState);
    const { userType } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                <TouchableOpacity style={{width: 100, alignItems: 'flex-end', marginRight: 5}} onPress={() => setShowFirstPage(previousState => !previousState)}>
                    <Text style={showFirstPage ? styles.button_bold : styles.button_nold}>Your Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 100, alignItems: 'flex-start', marginLeft: 5}} onPress={() => setShowFirstPage(previousState => !previousState)}>
                    <Text style={!showFirstPage ? styles.button_bold : styles.button_nold}>Gallery</Text>
                </TouchableOpacity>
            </View>
            {showFirstPage ? <YourFeedScreen userType={userType} /> : <GalleryScreen userType={userType} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.lightblue,
    },
    button_bold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        // marginLeft: 10,
        // marginRight: 10,
        marginBottom: 5
    },
    button_nold: {
        fontFamily: 'Poppins',
        fontSize: 16,
        // marginLeft: 10,
        // marginRight: 10,
        marginBottom: 5
    }
});