import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/themes';

const { width } = Dimensions.get('window');
const imageWidth = width / 2.2;


const images = [
   { uri: 'https://media.overstockart.com/optimized/cache/data/product_images/VG485-1000x1000.jpg' },
   { uri: 'https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg?w=300&h=169&c=crop' },
   { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjqvavTqoI8X5Fnhhsw1gNtrtPhg-mU5SJAQ&usqp=CAU' },
   { uri: 'https://cdn.britannica.com/71/99571-050-DFF0A6E5/Statue-of-Liberty-Island-New-York.jpg' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
   { uri: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png' },
];

const captions = [
    ["Vincent Van Gogh Painting", "Blue and Yellow Sky", "wave like clouds with a tower", "bruh"],
    ["The woman sits markedly upright in a pozzeto armchair with her arms folded, a sign of her reserved posture. Her gaze is fixed on the observer",  "this is u", "this is a", "this is l"],
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
        <SafeAreaView style = {styles.image_text}>
          <Image source={images[i]} style={styles.image} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.imageText}>{captions[i][0]}</Text>
        </SafeAreaView>
        </TouchableOpacity>
        {i + 1 < images.length && (
          <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i + 1 })}>
          <SafeAreaView style = {styles.image_text}>
            <Image source={images[i + 1]} style={styles.image} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.imageText}>{captions[i+1][0]}</Text>
          </SafeAreaView>
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
         <Stack.Screen name="Gallery" component={GalleryScreen} options={{headerShown: false}}/>
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
   marginBottom: 10
 },
 image: {
   width: imageWidth,
   height: imageWidth,
   marginTop: 5
 },
 singleImage: {
   width: width,
   height: width
 },
 imageText: {
    textAlign: 'center',
    marginTop: 5,
    color: Themes.colors.black,
    fontWeight: 'bold',
    maxWidth: imageWidth,
    marginBottom: 5
  },
  enhancedText: {
    textAlign: 'center',
    marginTop: 10,
    color: Themes.colors.black,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10
  },
  image_text: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: Themes.colors.verydark,
  }
});






