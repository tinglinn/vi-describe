import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/* import screens */
import MainScreen from './pages/main';
import { LoginType, Login } from './pages/login';

const Stack = createStackNavigator();

function LoginStacks() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="LoginType" component={LoginType} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LoginStacks/>
      </NavigationContainer>
    </SafeAreaProvider>
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
