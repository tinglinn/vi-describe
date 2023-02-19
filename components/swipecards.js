'use strict';

import React, { Component, useEffect, useState } from 'react';
import { Alert, ScrollView, SafeAreaView, StyleSheet, TextInput, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions, LinearGradient } from 'react-native';
import Themes from '../assets/themes';
import SwipeCards from 'react-native-swipe-cards';
import { supabase } from '../supabase_client';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image
                source={{ uri: this.props.url}} // pass in image param
                style={[styles.card, {backgroundColor: this.props.backgroundColor}]}
                imageStyle={styles.image}
            />

        )
    }
}

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            Alert.alert("No more images!")
        );
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            comment: "",
            comments: [],
            currentCard: 0,
        };
        this.handleYup = this.handleYup.bind(this);
        this.handleNope = this.handleNope.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
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
    getAllComments = async () => {
        const {data, error} = await supabase
        .rpc('get_all_comments');
        console.log("DATA:", data);      
        console.log(Object.keys(data).length);
        return Object.keys(data).length;
    }
    handleSubmitComment = async() => {
        //TODO:
        //FIX cur_image_id
        //GET TITLE WORKING
        console.log("REEEE");
        // new comment ID number       
        let new_comment_id = await this.getAllComments() + 1;
        console.log(this.state.currentCard);
        //updates COMMENTS to store the new comment
        const { error2 } = await supabase
        .from('COMMENTS')
        .insert(
            {comment_id: new_comment_id, content: this.state.comment, user_id: 1, title: "", image_id: this.state.cards[this.state.currentCard].url}
        )
        console.log("COMMENT:", this.state.comment, new_comment_id)
        console.log("URL:", this.state.cards[this.state.currentCard].url)
        console.log(error2)
        // update IMAGE_INFO to contain this comment with corresponding image
        // const { error3 } = await supabase
        // .from('IMAGE_INFO')
        // .update(
        //     {comment_ids: new_comment_id}
        // )
        // .eq('image_id', cur_image_id)
        
        
        // setComments([...comments, comment]);
        // setComment('');
    };

    handleYup(card) {
        this.setState(() => ({
            currentCard: (this.state.currentCard + 1) % this.state.cards.length
        }))        
        console.log(`Yup for ${card.text}`)
    }
    handleNope(card) {
        this.setState(() => ({
            currentCard: (this.state.currentCard + 1) % this.state.cards.length
        }))
        console.log(`Nope for ${card.text}`)
    }
    handleMaybe(card) {
        console.log(`Maybe for ${card.text}`)
    }

    
    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (
            <SafeAreaView style={styles.mainBody}>
                <View style={styles.colorblock}></View>
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
                    <View style={{ width: '85%', justifyContent: 'flex-start' }}>
                        <Text style={styles.title}>Prompt</Text>
                        <Text style={styles.prompt}>WRITE YOUR DESCRIPTION</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.comment}
                            onChangeText={(value) => {
                                this.setState(() => ({
                                    comment: value
                                }))
                            }}
                            placeholder="Describe this piece of art"
                        />
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TouchableOpacity style={styles.button} onPress={async () => {
                                await this.handleSubmitComment();
                                this.setState(() => ({
                                    //comments: this.state.comments.push(this.state.comment),
                                    comment: ""
                                })
                                );
                                
                            }}>
                                <Text style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.prompt}>WHAT OTHERS SAID</Text>
                        <View style={styles.input}>
                            {this.state.comments.map((comment, index) => (
                                <Text key={index} style={styles.comment}>
                                    {comment}
                                </Text>
                            ))}
                        </View>
                    </View>
                    
                    
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        display: "flex",
        justifyContent: "center",
    },
    colorblock: {
        width: Dimensions.get('window').width,
        height: 320,
        backgroundColor: '#c6e2ff',
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 0,
    },
    image: {
        width: '100%',
    },
    card: {
        aspectRatio: 1,
        width: Dimensions.get('window').width * 0.80,
        borderRadius: 20,
        flex: 1,
        marginTop: 10,
    },
    detailsContainer: {
        marginTop: 30,
        flex: 1,
        alignItems: "center",
    },
    title: {
        textAlign: 'left',
        fontFamily: 'Poppins-SemiBold',
        //fontWeight: '700',
        fontSize: 22,
        color: Themes.colors.darkblue
    },
    promptBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    prompt: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        color: Themes.colors.darkblue,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'#6F87A4',
        borderRadius: 15,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 14,
        fontFamily: 'Poppins'
    },
    button: {
        width: 140,
        height: 40,
        backgroundColor: '#276ABB',
        //padding: 10,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20
    },
    buttonText: {
        fontFamily: "Poppins-SemiBold",
        color: 'white',
        fontSize: 14
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

