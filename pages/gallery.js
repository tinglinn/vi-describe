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
   { uri: 'https://bloomandgrow.in/wp-content/uploads/2020/09/drawing-1-686x500.jpeg' },
   { uri: 'https://blog.artsper.com/wp-content/uploads/2019/06/Banksy.jpg' },
   { uri: 'http://lh3.googleusercontent.com/J0sw0IiqP2F4gavYnI-vUa5IBgHiHy42lohgm-qq1vuygUX0HQgylVSV1ZdDTV5XIg=s1200' },
   { uri: 'https://johngaber.files.wordpress.com/2017/10/the-great-wave-off-kanagawa.jpg' },
   { uri: 'https://www.sketchappsources.com/resources/source-image/nyan-cat-artoctober.png' },
   { uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSirEwnyuWzyX6bdRdT0-u5Zr0UdOGqSdwn5wDI58gqOx9m9Db8' },
   { uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIFTVGpoKDjwNh2bcSVrxy8D80MvqTtfI8m9REtL9MvWiLhNPG' },
   { uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL2H1L5W9QsCTkHFD0SpBfFeG7c96gU-yedkUaT_atKYScAfCr' },
];

const captions = [
    ["A dark, tranquil night sky with bright stars, a crescent moon, and swirling clouds. The stars are large and prominent, shining brightly against the deep blue sky. The town below is small and quiet, with only a few buildings and trees visible.", 
     "A dreamy night sky filled with stars, planets, and galaxies. The painting features a towering cypress tree that reaches towards the heavens and a sleepy village nestled beneath it. The sky is filled with swirling clouds that seem to dance around the bright stars, while a crescent moon glows in the distance.",
     "A European village amidst a dark wilderness, complete with dampened lights. Some buildings manage to emit just enough light to be noticed, but others, including, notably, the church, are dark and unwelcoming. However, the real action is what is going on above the town, where the moon and stars light up the sky. Light moves across the sky in great sweeps and strokes, defeating the dark sky wherever it is encountered.", 
     "The lower third of the painting comprises a starlit village landscape dominated by a white church. Twelve oversized stars, more like planets dot the upper left two thirds of the painting. The stars are surrounded with halos that suggest the blurriness of fog. The upper right of the sky is dominated by an enormous bright crescent moon and the entire left third from bottom to almost the top by a dark and imposing cypress. From left to right a curlicue of cloud splits the sky.",
     ],
    ["The woman sits markedly upright in a pozzeto armchair with her arms folded, a sign of her reserved posture. Her gaze is fixed on the observer",  
    "A seated woman with a gentle smile. She wears a colorful dress and a veil on her hair, and sits against a plain background. The woman's eyes appear to follow the viewer, and her expression is enigmatic and subtle. Her hands rest on the arm of a chair, and she holds a folded cloth. ", 
    "Features a woman with a serene expression and gentle smile. She has dark hair that is pulled back, and is dressed in a flowing gown with delicate folds. The painting is set against a plain background, and the woman appears to be sitting in front of a landscape. Her hands are delicately folded, and she holds a small object that is difficult to discern.", 
    "Depicts a woman seated against a landscape. The woman is dressed in an intricate dress with a veil covering her hair. Her gaze is directed towards the viewer, and her smile is enigmatic and alluring. Her hands rest on the arm of a chair, and she holds a folded object that has been the subject of much speculation."],
    ["A gray bodied dolphin with a yellow underbelly leaps out of the water. The water around the dolphin creates a splash as the dolphin jumps up. The dolphin has a small smile on its face, looking as if it is having fun.", 
    "A dolphin in the shape of a crescent moon jumps out of th water, high into the sky, where there are some clouds and a bright, yellow sun."],
    ["A girl reaching out towards a red heart-shaped balloon. The image is stenciled in black and white, with the balloon depicted in bright red.",  
    "Depicts a young girl reaching out for a heart-shaped balloon. The painting is simple and iconic, with a muted color palette and stark contrast between the girl and the balloon."],
    ["It shows a young woman with a pearl earring, looking over her shoulder. She wears a yellow garment, and the background is dark.", 
     "Portrays a young woman wearing a blue and gold turban and a large pearl earring.", 
     "It features a young woman with a pearl earring and a blue and gold turban. She looks over her shoulder with a serene expression and is set against a dark background."],
    ["Depicts a large wave rising above boats and fishermen in the sea. The wave is depicted with a dynamic and powerful force, while Mount Fuji stands tall in the background. The boats and fishermen are dwarfed by the wave, conveying a sense of the power of nature.",
      "It shows a huge wave with boats and fishermen, and Mount Fuji in the background."],
    ["Pixelated cat with a Pop-Tart body and a rainbow trail flying through space. The image is animated, and the cat leaves a trail of sparkles as it flies.", 
    "A cat with a Pop-Tart for a body, flying through space with a rainbow trail behind it. The cat has a cute, playful expression.", ],
    ["A man in a suit and bowler hat, with an apple obscuring his face. The background is a clear blue sky with clouds."],
    ["A painting by Vincent van Gogh that portrays the artist without his signature beard, with a serious expression and intense gaze. The painting is rendered in bold, expressive brushstrokes, with a dark background that creates a sense of depth and texture."],
    ["Napoleon Bonaparte riding a rearing horse, with an army in the background crossing the snow-covered Alps. The painting is dramatic and grandiose, with a sense of power and strength conveyed through Napoleon's posture and the rugged landscape."],
];

const headings = [
    "Starry Night",
    "Mona Lisa",
    "My Daughter's Drawing",
    "Banksy Balloon",
    "Girl with Pearl Earring",
    "The Great Wave",
    "Nyan Cat",
    "The Son of Man",
    "Van Gogh Self Portrait",
    "Napolean",
];

const dates = [
    "  FEB 03, 2023",
    "  OCT 22, 2022",
    "  JUL 16, 2022",
    "  JUN 26, 2022",
    "  JAN 02, 2023",
    "  MAR 19, 2022",
    "  FEB 27, 2022",
    "  NOV 05, 2022",
    "  JAN 22, 2023",
    "  APR 24, 2022",
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
            placeholder="Name this image"
          />
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={text => setComment(text)}
            placeholder="Describe this image"
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






