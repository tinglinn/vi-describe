import React, { useState } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase_client';
import { Upload } from 'upload-js'
import Themes from '../assets/themes';
export default function ImageUpload () {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');

    const upload = Upload({
        apiKey: "public_kW15b5DCGeXqW1ZyeN5JnPMx886t" // Your real API key.
      });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 1,
        });
        if (!result.canceled) {
            console.log("Going");
            setImage(result.uri);
            const blob = await result.blob();
            let selectedImage = new File([blob], "image1");
            console.log("Selected image");

            const { fileUrl, filePath } = await upload.uploadFile(
                // Required.
                selectedImage);
            console.log("IMAGE:", selectedImage);
            console.log("FILE:", fileUrl, filePath);
            const { data, error } = await supabase
            .storage
            .from('images')
            // update so that each image gets a different filepath
            .upload("image1.png", selectedImage)
            //get image URL from supabase bucket
            console.log("ERROR 0:", data, error);
            const { data1, error1 } = supabase
                .storage
                .from('images')
                // again, update
                .getPublicUrl('image1')
        
            console.log(error1);
            let image_url = data1[0];
            const { data2, error2 } = await supabase
                .from('IMAGE_INFO')
                .insert(
                    {image_id: 3, image_name: "placeholder", url: image_url, comment_ids: "", resolved: false, prompt: prompt}
            )
            console.log(error2);
    
        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.uploadCard}>
                <Text style={styles.uploadText}>Upload</Text>
                <Text style={styles.reminder}>Choose an artwork that you would like others to describe.</Text>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadBox}>
                        {!image && <Text style={[styles.reminder, { color: 'lightgray' }]}>Browse to chose an image</Text>}
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.promptBox}>
                <Text style={styles.uploadText}>Text</Text>
                <Text style={styles.reminder}>Optionally enter a prompt - what does this artwork mean to you? What would you like people to focus on?</Text>
                <TextInput
                    style={styles.promptInput}
                    onChangeText={text => setPrompt(text)}
                    value={prompt}
                    placeholder="Enter your prompt"
                    multiline={true}
                    maxLength={100}
                    />
            </View>
            <TouchableOpacity onPress={() => Alert.alert("Successfully posted!")}>
                <View style={{ borderRadius: 5, marginTop: 20, width: 80, height: 40, backgroundColor: '#be3577', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white'}}>Submit</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    );
};

//<Button title="Submit" onPress={() => console.log(prompt, image)} />

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.colors.blue
        //backgroundColor: '#9bc2ff'
    },
    titleText: {
        fontFamily: "Poppins-SemiBold",
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: "Poppins",
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    uploadCard: {
        width: '90%',
        borderRadius: 5,
        backgroundColor: Themes.colors.white,
        padding: 20,
        marginTop: 30,
        //justifyContent: 'space-between',
    },
    uploadText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 22,
        color: Themes.colors.black
    },
    uploadBox: {
        width: '100%',
        height: 150,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Themes.colors.verydark,
        borderStyle: "dashed",
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        marginBottom: 20,
    },
    reminder: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: Themes.colors.black,
    },
    promptBox: {
        width: '90%',
        borderRadius: 5,
        backgroundColor: Themes.colors.white,
        padding: 20,
        marginTop: 20,
    },
    promptInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: Themes.colors.verydark,
        borderStyle: 'dashed',
        borderRadius: 2,
        padding: 10,
        marginBottom: 20,
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Poppins',
        color: 'gray'
    },
});

//export default ImageUpload;
