import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/themes';

const { width } = Dimensions.get('window');
const imageWidth = width / 2.2;


const images = [
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://www.pokemoncenter.com/images/DAMRoot/Full-Size/10000/P8556_710-95814_01.jpg' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
];

const captions = [
    ["this is a really cool looking pokemon. It is definitely the best pokemon that has ever been made.", "this is u", "this is a", "this is l"],
    ["this is u",  "this is u", "this is a", "this is l"],
    ["this is b", "this is u", "this is a", "this is l"],
    ["this is u",  "this is u", "this is a", "this is l"],
    ["this is b", "this is u", "this is a", "this is l"],
    ["this is u",  "this is u", "this is a", "this is l"],
    ["this is b", "this is u", "this is a", "this is l"],
    ["this is u",  "this is u", "this is a", "this is l"],
    ["this is b", "this is u", "this is a", "this is l"],
    ["this is u",  "this is u", "this is a", "this is l"],
];

function GalleryScreen({ navigation }) {
 const imageRows = [];
 for (let i = 0; i < images.length; i += 2) {
   const imageRow = (
    <View key={i} style={styles.imageRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i })}>
          <Image source={images[i]} style={styles.image} />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.imageText}>{captions[i][0]}</Text>
        </TouchableOpacity>
        {i + 1 < images.length && (
          <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i + 1 })}>
            <Image source={images[i + 1]} style={styles.image} />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.imageText}>{captions[i+1][0]}</Text>
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
    const commentViews = [];
    for (let i = 0; i < captions[imageIndex].length; i ++) {
        const commentView = (
            <View>
                <Text style={styles.enhancedText}> {captions[imageIndex][i]}</Text>
            </View>
        );
        commentViews.push(commentView)
    }
  
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.singleImage} />
        {commentViews}
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
   marginTop: 25
 },
 singleImage: {
   width: width,
   height: width
 },
 imageText: {
    alignSelf: 'center',
    marginTop: 5,
    color: Themes.colors.black,
    fontWeight: 'bold',
    maxWidth: imageWidth,
  },
  enhancedText: {
    alignSelf: 'center',
    marginTop: 10,
    color: Themes.colors.black,
    fontWeight: 'bold',
  }
});






