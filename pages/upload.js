import React, { useState } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase_client';
import { Upload } from 'upload-js'
import Themes from '../assets/themes';
import SubmitButton from '../components/submitButton';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ImageUpload ({navigation, route}) {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [numImages, setNumImages] = useState(0);
    const { userType, email } = route.params;
    console.log(email, userType, 'from upload page')


    const getAllImages = async () => {
        const {data, error} = await supabase
        .rpc('get_all_images');
        console.log("DATA:", data);      
        console.log(Object.keys(data).length);
        return Object.keys(data).length;
    }

    const insertNewImage = async (bahee) => {
        console.log("Inserting image");
        const numImages = await getAllImages();
        console.log(bahee);
        console.log(prompt);
        prefix = "https://cburolnykagrisqerphu.supabase.co/storage/v1/object/public/images/"
        const { error } = await supabase
        .from('IMAGE_INFO')
        .insert({email: email, image_id: numImages + 1, image_name: bahee.substring(0, bahee.length - 4), url: prefix + bahee.substring(0, bahee.length - 4) + ".png", comment_ids: [], resolved: false, prompt: prompt});
    }

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
      const uploadImage = async () => {
        if (image) {
            console.log(image);
            const filename = image.split('/').pop();
            const fileExtension = "png";
            const newFilename = `${Date.now()}.${fileExtension}`;
            console.log(filename, fileExtension, newFilename);
            const file = {
            uri: image,
            name: newFilename,
            type: `image/${fileExtension}`,
            };
    
            try {
                console.log(file);
                const { data, error } = await supabase.storage.from('images').upload(newFilename, file, { expiresIn: 31536000 });
                
                if (error) {
                    console.log('Error uploading image:', error.message);
                } else {
                    const tempUrl = data.path;
                    console.log("Temporary URL:", tempUrl);
                    setImageUrl(tempUrl);
                    console.log('Image uploaded successfully:', tempUrl, prompt);
                    insertNewImage(tempUrl);
                }
            } catch (error) {
                console.log('Error uploading image:', error.message);
            }
        }
    };
    

    function onSubmit() {
        uploadImage();
        Alert.alert("Successfully posted!");
        setImage(null);
        setPrompt(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Upload Image</Text>
            <View style={styles.uploadCard}>
                <Text style={styles.titleText}>Choose an image that you would like others to describe.</Text>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadBox}>
                        {!image &&
                            <View style={{ marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: Themes.colors.darkblue, width: 40, aspectRatio: 1, borderRadius: 50, backgroundColor: Themes.colors.background, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                            </View>
                            }
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.promptBox}>
                <Text style={styles.titleText}>Optionally enter a prompt - what does this image mean to you? What would you like people to focus on?</Text>
                <TextInput
                    style={styles.promptInput}
                    onChangeText={text => setPrompt(text)}
                    value={prompt}
                    placeholder="Enter your prompt"
                    multiline={true}
                    maxLength={100}
                    />
            </View>
            <SubmitButton childFunction={onSubmit}/>
        </SafeAreaView>
    );
};

//<Button title="Submit" onPress={() => console.log(prompt, image)} />
{/* <TouchableOpacity onPress={onSubmit}>
    <View style={{ borderRadius: 5, marginTop: 20, width: 80, height: 40, backgroundColor: '#be3577', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>Submit</Text>
    </View>
</TouchableOpacity> */}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Themes.colors.lightblue
        //backgroundColor: '#9bc2ff'
    },
    titleText: {
        fontFamily: "Poppins-SemiBold",
        color: Themes.colors.darkblue,
        fontSize: 16,
        marginBottom: 10,
        //textAlign: 'center'
    },
    header: {
        fontFamily: "Poppins-SemiBold",
        //color: Themes.colors.darkblue,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        // marginTop: 10
    },
    uploadCard: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: Themes.colors.white,
        padding: 20,
        marginTop: 40,
        //justifyContent: 'space-between',
    },
    uploadText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: Themes.colors.darkblue
    },
    uploadBox: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        backgroundColor: '#CAD6E1',
        // borderWidth: 1,
        // borderColor: Themes.colors.verydark,
        // borderStyle: "dashed",
        marginTop: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        marginBottom: 20,
    },
    reminder: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: Themes.colors.darkblue,
    },
    promptBox: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: Themes.colors.white,
        padding: 20,
        marginTop: 20,
        marginBottom: 20
    },
    promptInput: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: Themes.colors.grayblue,
        // borderStyle: 'dashed',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginTop: 15,
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontSize: 16,
        color: Themes.colors.darkblue
    },
});

//export default ImageUpload;
