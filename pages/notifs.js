import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
import Themes from '../assets/themes';

function renderInsight({ item }) {
    return (
        <View>
            <View style={styles.statItem}>
                <MaterialCommunityIcons name="lightbulb-on-outline" color={Themes.colors.darkgray} size={20} />
                <View style={{ marginLeft: 8 }}><Text style={styles.stat}>{item[0]}</Text></View>
                
            </View>
            <View style={{ marginLeft: 8 }}><Text style={styles.stat}>{item[1]}</Text></View>
        </View>
        
    );
}

function Insights({ insights }) {
    return (
        <View style={styles.insightBox}>
            <FlatList data={insights} keyExtractor={(item, index) => index} renderItem={renderInsight}
                ItemSeparatorComponent={() => <View style={{ height: 5 }} />}></FlatList>
        </View>
    )
}

function SummaryOverview({navigation}) {
    return (
        <SafeAreaView style={styles.screen}>
            <Insights insights={[["Great job making your first post!", "5 hours ago"]]} />
            <Insights insights={[["Your post received 50 upvotes!", "3 hours ago"]]} />
            <Insights insights={[["Your post received 100 upvotes!", "1 hour ago"]]} />
        

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Themes.colors.white,
    },
    statItem: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    insightBox: {
        flexDirection: 'column',
        margin: 10,
        backgroundColor: Themes.colors.lightgreen,
        width: '90%',
        paddingTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        marginBotton: 12,
        borderRadius: 10,
    },
});

export default SummaryOverview;