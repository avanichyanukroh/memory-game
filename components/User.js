import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {  Text, Button, View, Badge } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, registerUser } from '../redux/APIActions';

import { setError } from '../redux/actions';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalContainer: {
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: '25%',
        marginBottom: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 32,
        height: '70%',
        width: '80%',
        borderRadius: 4
    },
    contentContainer: {
        position: 'absolute',
        top: 50,
        bottom: 32,
        left: 32,
        right: 32,
    },
    title: {
        textAlign: 'center',
        color: '#ff0000',
        fontSize: 32,
        lineHeight: 0,
        marginTop: 32,
        marginBottom: 32
    },
    subtitle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 24,
        lineHeight: 0,
        marginTop: 16,
        marginBottom: 16
    },
    headerContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        margin: -24
    },
    loginButton: {
        backgroundColor: '#ff0000',
        marginTop: 32
    },
    logoutButton: {
        textAlign: 'center',
        width: '100%',
        color: '#ff0000',
        fontSize: 24,
        marginTop: 8
    },
    exitButton: {
        height: 50,
        width: 50
    },
    text: {
        color: 'black',
        fontSize: 20,
        lineHeight: 0
    },
    exitIcon: {
        textAlign: 'center',
        color: '#ff0000',
        fontSize: 36,
        lineHeight: 0
    },
    subText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        lineHeight: 0
    },
    badge: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fbe555',
        marginBottom: 16
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
});

function User(props) {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const highScore = useSelector(store => store.highScore);

    const [fontLoaded, setFontLoaded] = useState(false);

    function handleLogout() {

    }

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() => setFontLoaded(true));
    }, []);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
                <Button style={styles.exitButton} transparent onPress={props.handleCloseModal}>
                    <Text style={fontLoaded ? [styles.exitIcon, styles.fontStyle] : null}>X</Text>
                </Button>
            </View>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.contentContainer}>
                <Text style={fontLoaded ? [styles.title, styles.fontStyle] : null}>{user.username}</Text>
                <Text style={fontLoaded ? [styles.subtitle, styles.fontStyle] : null}>Highest Score</Text>
                <Badge style={styles.badge}>
                    <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>{highScore.score} Pts</Text>
                </Badge>
                <Text style={fontLoaded ? [styles.subText, styles.fontStyle] : null}>({highScore.turn} turns & {highScore.time} sec)</Text>
                <Button style={[styles.loginButton]} onPress={handleLogout}>
                <Text style={fontLoaded ? [styles.logoutButton, styles.fontStyle] : null}>Sign Out</Text>
            </Button>
            </ScrollView>
        </View>
    );
}

export default User;