import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Themes from '../assets/themes';
import { supabase } from '../supabase_client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipecards from '../components/swipecards';


export default function Card ({ navigation })  {
    const [showDetails, setShowDetails] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    const handleImagePress = () => {
        setShowDetails(true);
    };
    

    const insertImageData = async () => {
        const { data, error } = await supabase
            .from('IMAGE_INFO')
            .insert(
                {image_id: 2, image_name: "png-transparent-climbing-sports-rock-rock-climbing-climb-mountain-silhouette-extreme-dangerous-cliff-thumbnail.png", url: "https://cburolnykagrisqerphu.supabase.co/storage/v1/object/public/images/png-transparent-climbing-sports-rock-rock-climbing-climb-mountain-silhouette-extreme-dangerous-cliff-thumbnail.png", comment_ids: null, resolved: false, prompt: "Prompt"}
                )
            };
            
    const getLatestImage = async () => {
        const {data, error} = await supabase
        .rpc('get_most_recent_image');
        
        console.log(data, error)
    }

    const getAllImages = async () => {
        const {data, error} = await supabase
        .rpc('get_all_images');
        
        console.log(data, error)
    }
        


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

    var Screen = <View style={{ backgroundColor: 'red'}}>
            <Swipecards />
        </View>
    return (
        <View style={styles.container}>
            {Screen}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
});