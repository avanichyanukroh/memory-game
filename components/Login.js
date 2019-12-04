import React, { useState, useEffect } from 'react';
import {StyleSheet } from 'react-native';
import {  Text, Button, View, Form, Item, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../redux/APIActions';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalContentContainer: {
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 32,
        height: '70%',
        width: '80%',
        borderRadius: 4
    },
    title: {
        textAlign: 'center',
        color: '#ff0000',
        fontSize: 24,
        lineHeight: 0,
        marginTop: 32,
        marginBottom: 32
    },
    subtitle: {
        textAlign: 'center',
        color: '#000028',
        fontSize: 24,
        lineHeight: 0
    },
    rowContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    loginButtonText: {
        textAlign: 'center',
        width: '100%',
        color: 'white',
        fontSize: 24
    },
    signUpButton: {
        borderColor: 'black',
        marginTop: 8
    },
    signUpButtonText: {
        textAlign: 'center',
        width: '100%',
        color: 'black',
        fontSize: 24
    },
    exitButton: {
        height: 50,
        width: 50
    },
    text: {
        textAlign: 'center',
        color: '#ff0000',
        fontSize: 36,
        lineHeight: 0
    }
});

function Login(props) {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [input, setInput] = useState({username: '', pin: ''})

    function handleInputChange(name, value) {
        console.log('name, value', name, value);
        setInput({...input, [name]: value})
    }

    function handleLogin() {
        console.log('logging in with: ', input.username, input.pin);
        dispatch(loginUser(input.username, input.pin));
    }

    useEffect(() => {
        if (user) {
            props.handleCloseModal();
        }
    }, [user]);

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <View style={styles.modalContentContainer}>
            {console.log(input)}
            <View style={styles.headerContainer}>
                <Button style={styles.exitButton} transparent onPress={props.handleCloseModal}>
                    <Text style={fontLoaded ? [styles.text, {fontFamily: 'Bangers'}] : null}>X</Text>
                </Button>
            </View>
            <Text style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>Welcome to Flashback!</Text>
            <Form>
                <Item>
                    <Input
                        textContentType="username"
                        placeholder="Username"
                        value={input.username}
                        onChangeText={(value) => handleInputChange('username', value)}
                    />
                </Item>
                <Item last>
                    <Input
                        textContentType="password"
                        // caretHidden
                        keyboardType="number-pad"
                        placeholder="4 Digit Pin"
                        value={input.pin}
                        onChangeText={(value) => handleInputChange('pin', value)}
                    />
                </Item>
            </Form>
            <Button style={[styles.loginButton]} onPress={handleLogin}>
                <Text style={fontLoaded ? [styles.loginButtonText, {fontFamily: 'Bangers'}] : null}>Login</Text>
            </Button>
            <Button style={[styles.signUpButton]} bordered>
                <Text style={fontLoaded ? [styles.signUpButtonText, {fontFamily: 'Bangers'}] : null}>Sign Up</Text>
            </Button>
        </View>
    );
}

export default Login;