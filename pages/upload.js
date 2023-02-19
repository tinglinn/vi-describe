import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase_client';
import { Upload } from 'upload-js'
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
            const blob = await response.blob();
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
            {image && (
                <Image source={{ uri: image }} style={styles.image} />
            )}
            <Button title="Choose an image" onPress={pickImage} />
            <TextInput
                style={styles.promptInput}
                onChangeText={text => setPrompt(text)}
                value={prompt}
                placeholder="Enter a prompt"
            />
            <Button title="Submit" onPress={() => console.log(prompt, image)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    promptInput: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
    },
});

//export default ImageUpload;
