import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator, BottomTabBar, BottomTabView } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import SwipeScreen from './pages/swipe';
import UploadScreen from './pages/upload';
import GalleryScreen from './pages/gallery';
import NotifsScreen from './pages/notifs';
import ProfileScreen from './pages/profile';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
