import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Themes from '../assets/themes';
import { supabase } from '../supabase_client';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ImageScreen ({ navigation })  {
    const [showDetails, setShowDetails] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleImagePress = () => {
        setShowDetails(true);
    };

    const handleSubmitComment = () => {
        // this is def not correct, should handle submitting comment logic here
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

    function BackButton() {
        return (
            <Pressable style={{marginTop: 5, marginBottom: 15, marginRight: 300}} onPress={() => setShowDetails(false)}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <MaterialCommunityIcons name="arrow-left" color={Themes.colors.blue} size={20} />
                    <Text style={{ color: Themes.colors.blue, fontFamily: 'Poppins', fontSize: 15 }}>Back</Text>
                </View>
            </Pressable>
        );
    }
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
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <BackButton/>
                <View style={styles.imageCard}>
                    <Image style={styles.image} source={require('../assets/images/login_logo.png')} />
                    <View style={styles.promptBox}><Text style={styles.prompt}>Prompt goes here: here it is here it is here it is here it is</Text></View>
                </View>
                <View style={styles.commentsContainer}>
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
                </View>
                
                <View style={styles.commentsContainer}>
                    <Text style={styles.prompt}>Existing Comments</Text>
                    {comments.map((comment, index) => (
                        <Text key={index} style={styles.comment}>
                            {comment}
                        </Text>
                    ))}
                </View>
            </ScrollView>
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
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    button: {
        width: 70,
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
        width: 360,
        backgroundColor: Themes.colors.white,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    comment: {
        fontSize: 14,
        marginBottom: 5,
    },
});