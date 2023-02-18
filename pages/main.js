import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Dimensions, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator, BottomTabBar, BottomTabView } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

/* import screens */
import SwipeScreen from './swipe';
import UploadScreen from './upload';
import GalleryScreen from './gallery';
import NotifsScreen from './notifs';
import ProfileScreen from './profile';

/* set up function to toggle between swipe and upload, depending on which kind of user 
<Tab.Screen name="Swipe" component={SwipeScreen} />
            <Tab.Screen name="Gallery" component={GalleryScreen} />
            <Tab.Screen name="Notifs" component={NotifsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />*/

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation, route}) {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Swipe" component={SwipeScreen} />
            <Tab.Screen name="Gallery" component={GalleryScreen} />
            <Tab.Screen name="Notifs" component={NotifsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
