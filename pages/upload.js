import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUpload () {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
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
