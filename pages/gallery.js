import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/themes';

const { width } = Dimensions.get('window');
const imageWidth = width / 2;


const images = [
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
];


function GalleryScreen({ navigation }) {
 const imageRows = [];
 for (let i = 0; i < images.length; i += 2) {
   const imageRow = (
     <View key={i} style={styles.imageRow}>
       <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i })}>
         <Image source={images[i]} style={styles.image} />
       </TouchableOpacity>
       {i + 1 < images.length && (
         <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i + 1 })}>
           <Image source={images[i + 1]} style={styles.image} />
         </TouchableOpacity>
       )}
     </View>
   );
   imageRows.push(imageRow);
 }


 return (
   <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollContainer}>
       {imageRows}
     </ScrollView>
   </View>
 );
}


function ImageScreen({ route }) {
 const { imageIndex } = route.params;
 const image = images[imageIndex];


 return (
   <View style={styles.container}>
     <Image source={image} style={styles.singleImage} />
   </View>
 );
}


const Stack = createStackNavigator();


export default class App extends Component {
 render() {
   return (
     <NavigationContainer independent={true}>
       <Stack.Navigator initialRouteName="Gallery">
         <Stack.Screen name="Gallery" component={GalleryScreen} />
         <Stack.Screen name="Image" component={ImageScreen} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: Themes.colors.black,
 },
 scrollContainer: {
   flexGrow: 1,
   justifyContent: 'flex-start',
   minHeight: Dimensions.get('window').height + 1,
 },
 imageRow: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingHorizontal: 10,
 },
 image: {
   width: imageWidth,
   height: imageWidth,
   marginBottom: 10,
 },
 singleImage: {
   width: width,
   height: width
 }
});
