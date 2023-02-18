import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Themes from '../assets/themes';
import { supabase } from '../supabase_client';

export default function ImageScreen ({ navigation })  {
    const [showDetails, setShowDetails] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleImagePress = () => {
        setShowDetails(true);
    };

    const handleSubmitComment = () => {
        setComments([...comments, comment]);
        setComment('');
    };

    const insertImageData = async () => {
        // Handle login logic here

        const { data, error } = await supabase
            .from('IMAGE_INFO')
            .insert(
                { image_id: "IMG_FA1468EF1C2A-1.jpeg", created_at: "2023-02-17-01T01:01:01.000Z", png: "https://jdkwthcuizrwzcpulkex.supabase.co/storage/v1/object/sign/image-pngs/IMG_FA1468EF1C2A-1.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS1wbmdzL0lNR19GQTE0NjhFRjFDMkEtMS5qcGVnIiwiaWF0IjoxNjc2NzA5NDIzLCJleHAiOjE3MDgyNDU0MjN9.e8PnHP8soSMb_zkqPABpa_TcMd8Z2Et9V1WciPKYGUQ&t=2023-02-18T08%3A37%3A03.261Z", comment_ids: null, resolved: false, prompt: "Prompt" }
            )
    };

    // const getLatestImage = async () => {
    //     const {data, error} = await supabase
    //     .from(IMAGE_INFO)
    //     .select(row=0)
    // }

    var Screen = null;
    if (!showDetails) {
        Screen =
            <TouchableOpacity onPress={handleImagePress} style={styles.imageCard}>
                <Image style={styles.image} source={require('../assets/images/login_logo.png')} />
                <View style={styles.promptBox}><Text style={styles.prompt}>Prompt goes here: here it is here it is here it is here it is</Text></View>
            </TouchableOpacity>
    } else {
        Screen =
            <View style={styles.detailsContainer}>
                <Image style={styles.image} source={require('../assets/images/login_logo.png')} />
                <Text style={styles.prompt}>Enter your description:</Text>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Type your description here"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmitComment}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <ScrollView style={styles.commentsContainer}>
                    {comments.map((comment, index) => (
                        <Text key={index} style={styles.comment}>
                            {comment}
                        </Text>
                    ))}
                </ScrollView>
            </View>
    }
    return (
        <View style={styles.container}>
            {Screen}
        </View>
    );
};

/*<TouchableOpacity onPress={handleImagePress}>
                <Image style={styles.image} source={{ uri: IMAGE_URL }} />
            </TouchableOpacity>
            {showDetails && (
                <View style={styles.detailsContainer}>
                    <Image style={styles.image} source={{ uri: IMAGE_URL }} />
                    <Text style={styles.prompt}>Enter a comment:</Text>
                    <TextInput
                        style={styles.input}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Type your comment here"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmitComment}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.commentsContainer}>
                        {comments.map((comment, index) => (
                            <Text key={index} style={styles.comment}>
                                {comment}
                            </Text>
                        ))}
                    </ScrollView>
                </View>
            )}*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCard: {
        width: 360,
        height: 450,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Themes.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 340,
        height: 340,
        borderRadius: 10,
        marginBottom: 10,
    },
    detailsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    promptBox: {
        padding: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    prompt: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    commentsContainer: {
        width: '80%',
        height: 100,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    comment: {
        fontSize: 14,
        marginBottom: 5,
    },
});