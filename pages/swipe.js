import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../supabase_client';


export default function SwipeScreen() {
    // const [, setEmailUsed] = useState(false)


    const insertImageData = async () => {
        // Handle login logic here

        const { data, error } = await supabase
        .from('IMAGE_INFO')
        .insert(
            {image_id: "IMG_FA1468EF1C2A-1.jpeg", created_at: "2023-02-17-01T01:01:01.000Z", png: "https://jdkwthcuizrwzcpulkex.supabase.co/storage/v1/object/sign/image-pngs/IMG_FA1468EF1C2A-1.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS1wbmdzL0lNR19GQTE0NjhFRjFDMkEtMS5qcGVnIiwiaWF0IjoxNjc2NzA5NDIzLCJleHAiOjE3MDgyNDU0MjN9.e8PnHP8soSMb_zkqPABpa_TcMd8Z2Et9V1WciPKYGUQ&t=2023-02-18T08%3A37%3A03.261Z", comment_ids: null, resolved: false, prompt: "Prompt"}
        )
    };

    // const getLatestImage = async () => {
    //     const {data, error} = await supabase
    //     .from(IMAGE_INFO)
    //     .select(row=0)
    // }
    
    return (
        <View style={styles.container}>
            <Button title="press the button" onPress={insertImageData} />
        </View>
    );
}
//code to get an image



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});