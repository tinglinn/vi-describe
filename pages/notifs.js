import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import Themes from '../assets/themes';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'New comments',
        message: 'You have two new comments on your post',
        timestamp: '3 hours ago',
        read: false,
    },
    {
        id: '2',
        title: 'New comment',
        message: 'You have a new comment on your post',
        timestamp: 'Yesterday',
        read: true,
    },
    {
        id: '3',
        title: 'New comment',
        message: 'You have a new comment on your post',
        timestamp: '2 days ago',
        read: true,
    },
];

const NotificationItem = ({ item }) => {
    const { title, message, timestamp, read } = item;

    return (
        <View style={[styles.notificationItem, read && styles.readNotification]}>
            <Text style={styles.notificationTitle}>{title}</Text>
            <Text style={styles.notificationMessage}>{message}</Text>
            <Text style={styles.notificationTimestamp}>{timestamp}</Text>
        </View>
    );
};

const NotificationsTab = () => {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const markAsRead = (id) => {
        const updatedNotifications = notifications.map((notification) => {
            if (notification.id === id) {
                return {
                    ...notification,
                    read: true,
                };
            }

            return notification;
        });

        setNotifications(updatedNotifications);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{marginBottom: 15, textAlign: 'center', fontFamily: "Poppins-SemiBold", fontSize: 16}}>Notifications</Text>
            <FlatList
                data={notifications}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.notificationList}
                onRefresh={() => setNotifications(NOTIFICATIONS)}
                refreshing={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.lightblue,
    },
    notificationList: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    notificationItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    readNotification: {
        opacity: 0.5,
    },
    notificationTitle: {
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Poppins'
    },
    notificationTimestamp: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Poppins'
    },
});

export default NotificationsTab;
