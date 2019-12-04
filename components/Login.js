import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {  Text, Button, View, Form, Item, Input, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../redux/APIActions';

import { setError } from '../redux/actions';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalContentContainer: {
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
    },
    errorMessage: {
        marginTop: 16,
        color: 'red'
    }
});

function Login(props) {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const loading = useSelector(store => store.loading);
    const error = useSelector(store => store.error);

    const [formType, setFormType] = useState('login');
    const [fontLoaded, setFontLoaded] = useState(false);
    const [input, setInput] = useState({username: '', pin: '', pinConfirmation: ''});

    function handleInputChange(name, value) {
        console.log('name, value', name, value);
        setInput({...input, [name]: value})
    }

    function handleLogin() {
        console.log('logging in with: ', input.username, input.pin);
        dispatch(loginUser(input.username, input.pin));
    }

    function handleFormChangeToSignUp() {
        setFormType('signUp');
    }

    function handleSignUpSubmit() {
        
        if (input.username.length > 2 ) {
            if (input.pin === input.pinConfirmation) {
                console.log('PINS MATCH!');
                // dispatch(signUpUser(input.username, input.pin));
            }
            else {
                dispatch(setError('pinMatch'));
                setInput({...input, pin: '', pinConfirmation: ''});
            }
        }
        else {
            dispatch(setError('usernameLength'));
            setInput({...input, pin: '', pinConfirmation: ''});
        }
    }

    useEffect(() => {
        if (user) {
            props.handleCloseModal();
        }
    }, [user]);

    useEffect(() => {
        if (error === 'login') {
            setInput({...input, pin: ''})
        }
    }, [error]);

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.modalContentContainer}>
            <View style={styles.headerContainer}>
                <Button style={styles.exitButton} transparent onPress={props.handleCloseModal}>
                    <Text style={fontLoaded ? [styles.text, {fontFamily: 'Bangers'}] : null}>X</Text>
                </Button>
            </View>
            
            <Text style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>{formType === 'login' ? 'Welcome Back!' : 'Sign Up Below'}</Text>
            <Form>
                <Item>
                    <Input
                        textContentType="username"
                        placeholder="Username"
                        value={input.username}
                        onChangeText={(value) => handleInputChange('username', value)}
                        disabled={loading === 'login' ? true : false}
                    />
                </Item>
                <Item last>
                    <Input
                        textContentType="password"
                        type="password"
                        secureTextEntry
                        keyboardType="number-pad"
                        placeholder="4 Digit Pin"
                        value={input.pin}
                        onChangeText={(value) => handleInputChange('pin', value)}
                        disabled={loading === 'login' ? true : false}
                    />
                </Item>
                {formType === 'signUp' ?
                    <Item last>
                        <Input
                            textContentType="password"
                            type="password"
                            secureTextEntry
                            keyboardType="number-pad"
                            placeholder="Confirm 4 Digit Pin"
                            value={input.pinConfirmation}
                            onChangeText={(value) => handleInputChange('pinConfirmation', value)}
                            disabled={loading === 'login' ? true : false}
                        />
                    </Item>
                    :
                    null
                }
                {error === 'login' ?
                    <Text style={styles.errorMessage}>Incorrect username or password</Text>
                    :
                    error === 'pinMatch' ?
                        <Text style={styles.errorMessage}>Confirmation pin does not match</Text>
                        :
                        error === 'usernameLength' ?
                            <Text style={styles.errorMessage}>Username must be a minimum of 3 characters</Text>
                            :
                            <Text style={styles.errorMessage}></Text>
                }
                
            </Form>
            {formType === 'login' ?
                loading === 'login' ? 
                    <>
                        <Spinner color='red' />
                        <Button style={[styles.signUpButton]} onPress={handleFormChangeToSignUp} disabled={loading === 'signUp' ? true : false} bordered>
                            <Text style={fontLoaded ? [styles.signUpButtonText, {fontFamily: 'Bangers'}] : null}>Sign Up</Text>
                        </Button>
                    </>
                    :
                    <>
                        <Button style={[styles.loginButton]} onPress={handleLogin}>
                            <Text style={fontLoaded ? [styles.loginButtonText, {fontFamily: 'Bangers'}] : null}>Login</Text>
                        </Button>
                        <Button style={[styles.signUpButton]} onPress={handleFormChangeToSignUp} disabled={loading === 'login' ? true : false} bordered>
                            <Text style={fontLoaded ? [styles.signUpButtonText, {fontFamily: 'Bangers'}] : null}>Sign Up</Text>
                        </Button>
                    </>
                :
                loading === 'signUp' ? 
                    <Spinner color='red' />
                    :
                    <Button style={[styles.loginButton]} onPress={handleSignUpSubmit}>
                        <Text style={fontLoaded ? [styles.loginButtonText, {fontFamily: 'Bangers'}] : null}>Submit</Text>
                    </Button>
        }
            
        </ScrollView>
    );
}

export default Login;