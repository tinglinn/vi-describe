import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Dimensions, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator, BottomTabBar, BottomTabView } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Themes from '../assets/themes/index';

/* import screens */
import SwipeScreen from '../components/swipecards';
import UploadScreen from './upload';
import GalleryScreen from './gallery';
import NotifsScreen from './notifs';
import ProfileScreen from './profile';
import YourFeedScreen from './yourfeed';
import ExploreScreen from './explore';

/* set up function to toggle between swipe and upload, depending on which kind of user */

const Tab = createBottomTabNavigator();

export default function BottomTabs({ navigation, route }) {
    const { userType } = route.params;
    var HomeScreen = (userType == "A") ? UploadScreen : SwipeScreen; // toggle based on user type
    
    return (
        <Tab.Navigator
            initialRouteName="Home"
            inactiveColor={Themes.colors.darkgray}
            screenOptions={{
                tabBarActiveTintColor: Themes.colors.verydark,
                headerShown: false,
                tabBarStyle: { padding: 8, height: 85 },
                tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins'}
            }}  
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    < MaterialCommunityIcons name="pencil-box-multiple-outline" color={ color } size={ Themes.fonts.iconSize } />
                ),
            }} />
            <Tab.Screen name="Gallery" component={ExploreScreen} options={{
                tabBarLabel: 'Gallery',
                tabBarIcon: ({ color }) => (
                    < Ionicons name="md-search-sharp" color={color} size={Themes.fonts.iconSize} />
                ),
            }} />
            <Tab.Screen name="Notifs" component={NotifsScreen} options={{
                tabBarLabel: 'Notification',
                tabBarIcon: ({ color }) => (
                    < MaterialIcons name="notifications-none" color={color} size={Themes.fonts.iconSize} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    < Ionicons name="person-circle-outline" color={color} size={Themes.fonts.iconSize} />
                ),
            }} />
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
