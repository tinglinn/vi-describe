import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserInfoPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>John Doe</Text>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={18} color="#f7c600" />
                        <Text style={styles.rating}>4.8</Text>
                    </View>
                </View>
            </View>
            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <Ionicons name="mail" size={20} color="#007aff" />
                    <Text style={styles.detailText}>johndoe@gmail.com</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="call" size={20} color="#007aff" />
                    <Text style={styles.detailText}>(123) 456-7890</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="location" size={20} color="#007aff" />
                    <Text style={styles.detailText}>123 Main St, Anytown USA</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="card" size={20} color="#007aff" />
                    <Text style={styles.detailText}>Visa ending in 1234</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 18,
        color: '#666',
        marginLeft: 5,
    },
    details: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 18,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#007aff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserInfoPage;
