// SwipeCards.js
// DONT USE YET, ITS JUST BORROWED PLACEHOLDER CODE AND HAS NOT BEEN EDITED

'use strict';

import React, { Component, useEffect, useState } from 'react';
import { ScrollView,StyleSheet, TextInput, Text, View, Image, TouchableOpacity,ImageBackground, Dimensions } from 'react-native';
import Themes from '../assets/themes';
import SwipeCards from 'react-native-swipe-cards';
import { supabase } from '../supabase_client';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground
                source={{ uri: this.props.url}} // pass in image param
                style={[styles.card, {backgroundColor: this.props.backgroundColor}]}
                imageStyle={styles.image}
            >
                <View style={styles.image_box_top}>
                    <Text style={styles.subheading_text}>{}</Text>
                </View>
                <View style={styles.image_box_bottom}>
                    <Text style={styles.body_text}>{this.props.prompt}</Text>
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
            cards: [],
            comment: "",
            comments: [],
        };
    }

    async fetchData() {
        const {data, error} = await supabase
        .rpc('get_all_images');
        this.setState(() => ({
            cards: data,
        }));
        console.log(this.state.cards);
    }

    componentDidMount() {
        this.fetchData();
    }

    handleSubmitComment = () => {
        // this is def not correct, should handle submitting comment logic here
        // this.setComments([...comments, comment]);
        // setComment('');
        // this.setState(() => ({
        //     comment: ""
        // }));
    };

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
            <View style={styles.mainBody}>
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
                    <ScrollView contentContainerStyle={styles.detailsContainer}>
                    <View style={styles.commentsContainer}>
                        <Text style={styles.prompt}>Enter your description:</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.comment}
                            onChangeText={(value) => {this.setState(() => ({
                                    comment: value
                                }))}}
                            placeholder="Type your description here"
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.setState(() => ({
                                //comments: this.state.comments.push(this.state.comment),
                                comment: ""
                            }));
                        }}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.commentsContainer}>
                        <Text style={styles.prompt}>Existing Comments</Text>
                        {this.state.comments.map((comment, index) => (
                            <Text key={index} style={styles.comment}>
                                {comment}
                            </Text>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainBody: {
        backgroundColor: Themes.colors.black,
        display: "flex",
        justifyContent: "center",
        padding: 20,
        
    },
    
    image: {
        width: '92%',
        borderRadius: 15,
    },

    card: {
        width: Dimensions.get('window').width - 0,
        flex: 1,
        left: 16,
    },

    // text
    body_text: {
        color: 'white',
        fontFamily: 'Sydney',
        fontSize: 25,
    },

    title_text: {
        color: 'white',
        fontFamily: 'Sydney-Bold',
        fontSize: 30,
    },
    
    detailsContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
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
        color: Themes.colors.white,
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
        backgroundColor: Themes.colors.black,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        bottom: 0,
        // height: 200,
    },
    comment: {
        fontSize: 14,
        marginBottom: 5,
        
    },
})

