import React, { Component, useState } from 'react';
import { TextInput, StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions, Text, SafeAreaView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/themes';
import { Foundation, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import SubmitButton from '../components/submitButton';

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

const headings = [
    "Starry Night",
    "Mona Lisa",
    "The Louvre",
    "Statue of Liberty",
    "bulbasaur",
    "bulbasaur",
    "bulbasaur",
    "bulbasaur",
    "bulbasaur",
    "bulbasaur",
];

const dates = [
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
    "  APR 22, 2021",
];


function GalleryScreen({ navigation }) {
 const imageRows = [];
 for (let i = 0; i < images.length; i += 2) {
   const imageRow = (
    <View key={i} style={styles.imageRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i })}>
            <View style={styles.card}>
                <View style = {styles.picture}>
                    <Image source={images[i]} style={styles.image} />
                </View>
                <View style = {styles.image_text}>
                    <View style={{width: '100%'}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.heading}>{headings[i]}</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.imageText}>{captions[i][0]}</Text>
                        <View style={styles.dateBox}>
                        <Foundation name="clock" size={15} color={Themes.colors.grayblue} />
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.date}>{dates[i]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        {i + 1 < images.length && (
        <TouchableOpacity onPress={() => navigation.navigate('Image', { imageIndex: i + 1 })}>
            <View style={styles.card}>
                <View style = {styles.picture}>
                    <Image source={images[i + 1]} style={styles.image} />
                </View>
                <View style = {styles.image_text}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.heading}>{headings[i+1]}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.imageText}>{captions[i+1][0]}</Text>
                    <View style={styles.dateBox}>
                        <Foundation name="clock" size={15} color={Themes.colors.grayblue} />
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.date}>{dates[i+1]}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        )}
    </View>
   );
   imageRows.push(imageRow);
 }


 return (
   <SafeAreaView style={styles.container}>
    {/* <Text style={styles.gallery}>Gallery</Text> */}
     <ScrollView contentContainerStyle={styles.scrollContainer}>
       {imageRows}
     </ScrollView>
   </SafeAreaView>
 );
}


{/* <View key={i}>
  <Text style={styles.enhancedText}> {captions[imageIndex][i]}</Text>
</View> */}

// {
//   captions.map((comment, index) => (
//     <Text key={index} style={styles.comment}>
//       {comment}
//     </Text>
//   ))
// }

function ImageScreen({ navigation, route }) {
    const { imageIndex } = route.params;
    const [describe, setDescribe] = useState(false)
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const image = images[imageIndex];
    const commentViews = [];
    for (let i = 0; i < captions[imageIndex].length; i ++) {
      const commentView = (
          <View key={i} style={styles.input}>
            <Text style={styles.comment}>
                {captions[imageIndex][i]}
              </Text>
          </View>
        );
        commentViews.push(commentView)
    }
  
    return (
      <SafeAreaView style={styles.mainBody}>
        <View style={styles.colorblock}></View>
        <Pressable style={{ marginTop: 5, marginBottom: 15, marginRight: 300 }} onPress={() => navigation.navigate("Gallery")}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <MaterialCommunityIcons name="arrow-left" color={Themes.colors.blue} size={20} />
            <Text style={{ color: Themes.colors.blue, fontFamily: 'Poppins', fontSize: 15 }}>Back</Text>
          </View>
        </Pressable>

        <Image source={image} style={{ width: Dimensions.get('window').width * 0.80, aspectRatio: 1, borderRadius: 20 }} />
        
        {!describe && <View style={{flex: 1}}>
          <View style={styles.promptBox}><Text style={styles.prompt}>WHAT PEOPLE SAY ABOUT THIS IMAGE</Text></View>
          <TouchableOpacity onPress={() => setDescribe(true)} style={{ right: 0, bottom: 0, position: 'absolute', zIndex: 2 }}>
            <Ionicons name="add-circle" size={45} color={Themes.colors.buttonblue} />
          </TouchableOpacity>
          
          <ScrollView >
            {commentViews}
          </ScrollView>
          
        </View>}

        {describe && <View>
          <View style={styles.promptBox}><Text style={styles.prompt}>DESCRIBE THIS IMAGE</Text></View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Name this piece of art"
          />
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={text => setComment(text)}
            placeholder="Describe this piece of art"
          />
         <SubmitButton childFunction={() => setDescribe(false)} />
        </View>}

      </SafeAreaView>
      
    );
  }
  


const Stack = createStackNavigator();


export default function ExportScreen({userType}) {

   return (
     <NavigationContainer independent={true}>
       <Stack.Navigator initialRouteName="Gallery">
         <Stack.Screen name="Gallery" component={GalleryScreen} options={{headerShown: false}}/>
         <Stack.Screen name="Image" component={ImageScreen} options={{ headerShown: false }} />
       </Stack.Navigator>
     </NavigationContainer>
   );
}


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  colorblock: {
    width: Dimensions.get('window').width,
    height: 300,
    backgroundColor: Themes.colors.lightblue,
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
  },
  input: {
    width: Dimensions.get('window').width * 0.80,
    minHeight: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6F87A4',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Poppins',
    padding: 10
  },
  prompt: {
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 5,
    color: Themes.colors.darkblue,
  },
  promptBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.80,
    marginTop: 20,
    marginBotton: 10
  },
  comment: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins',
    color: Themes.colors.darkblue
  },
 container: {
   flex: 1,
   backgroundColor: Themes.colors.lightblue,
 },
 scrollContainer: {
   flexGrow: 1,
   justifyContent: 'flex-start',
   minHeight: Dimensions.get('window').height + 1,
 },
 imageRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   marginBottom: 20,
 },
 image: {
   width: '100%',
   aspectRatio: 1,
   // overflow: 'hidden'
   //height: imageWidth,
 },
 singleImage: {
   width: width,
   height: width
 },
 imageText: {
    maxWidth: imageWidth,
    marginLeft: 3,
    marginTop: 7,
    marginBottom: 4,
    color: '#004475',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  enhancedText: {
    textAlign: 'center',
    marginTop: 10,
    color: Themes.colors.black,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins',
  },
  image_text: {
    // borderRadius: 2,
    // borderWidth: 0.2,
    // borderColor: Themes.colors.verydark,
    backgroundColor: '#FFFFFF',
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    padding: 10,
  },
  picture: {
    width: '100%'
  },
  heading: {
    marginLeft: 3,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: "#004475",
    fontSize: 14
  },
  date: {
    marginLeft: 3,
    fontWeight: 'bold',
    color: "#6F87A4",
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold'
  },
  gallery: {
    color: "#004475",
    //fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center'
  },
  card: {
    height: 275,
    width: 170,
    borderRadius: 15,
    borderWidth: 0.2,
    borderColor: Themes.colors.verydark,
    backgroundColor: '#FFFFFF',
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,ß
    overflow: 'hidden',
    marginLeft: 10,
    marginRight: 10
  },
  dateBox: {
    marginLeft: 2, 
    marginTop: 3, 
    flexDirection: 'row', 
    alignItems: 'center'
  }
});






