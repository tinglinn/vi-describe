// SwipeCards.js
// DONT USE YET, ITS JUST BORROWED PLACEHOLDER CODE AND HAS NOT BEEN EDITED

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import { Themes } from '../assets/Themes';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground
                source={Profiles.mtl.image}
                style={[Themes.dark.shadows, styles.card]}
                imageStyle={styles.image}
            >
                <View style={styles.image_box_top}>
                    <Text style={styles.subheading_text}>MTL</Text>
                </View>
                <View style={styles.image_box_bottom}>
                    <Text style={styles.body_text}>2 miles away</Text>
                </View>
            </ImageBackground>

        )
    }
}

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.body_text}>No more cards</Text>
            </View>
        )
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                { text: 'Tomato', image: Profiles.mtl.image },
                { text: 'Aubergine', backgroundColor: 'purple' },
                { text: 'Courgette', backgroundColor: 'green' },
                { text: 'Blueberry', backgroundColor: 'blue' },
                { text: 'Umm...', backgroundColor: 'cyan' },
                { text: 'orange', backgroundColor: 'orange' },
            ]
        };
    }

    handleYup(card) {
        console.log(`Yup for ${card.text}`)
    }
    handleNope(card) {
        console.log(`Nope for ${card.text}`)
    }
    handleMaybe(card) {
        console.log(`Maybe for ${card.text}`)
    }
    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (
            <SwipeCards
                style={styles.swipeCards}
                cards={this.state.cards}
                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
                handleMaybe={this.handleMaybe}
                hasMaybeAction
            />
        )
    }
}

const styles = StyleSheet.create({

    image: {
        width: '100%',
        borderRadius: 20,
        //padding: 0,
        //padding: 30,
    },

    card: {
        width: Dimensions.get('window').width - 60,
        //height: Dimensions.get('window').height,
        flex: 1,


    },

    image_box_top: {
        position: 'absolute',
        top: 10,
        left: 20,
        color: 'white',
        flexDirection: 'column'
    },

    image_box_bottom: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: 'white',
        flexDirection: 'column',
    },

    // text
    body_text: {
        color: 'white',
        fontFamily: 'Sydney',
        fontSize: 25,
    },

    subheading_text: {
        color: 'white',
        fontFamily: 'Sydney',
        fontSize: 25,
        marginBottom: 10,
    },

    title_text: {
        color: 'white',
        fontFamily: 'Sydney-Bold',
        fontSize: 30,
    },
})