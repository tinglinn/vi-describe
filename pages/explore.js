import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions, Text, SafeAreaView, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/themes';
import { Foundation } from '@expo/vector-icons'; 

import GalleryScreen from './gallery';
import YourFeedScreen from './yourfeed';

export default function ExplorePage () {
    const [showFirstPage, setShowFirstPage] = useState(true);
    const toggleSwitch = () => setShowFirstPage(previousState => !previousState);
    
    return (
        <SafeAreaView style={styles.container}>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={showFirstPage ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={showFirstPage}
            />
            {showFirstPage ? <YourFeedScreen/> : <GalleryScreen/>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});


//{showFirstPage ? 'Show Second Page' : 'Show First Page'}
{/* <TouchableOpacity onPress={() => setShowFirstPage(!showFirstPage)}>
        <Text>Gallery</Text>
      </TouchableOpacity> */}
//export default ExplorePage;