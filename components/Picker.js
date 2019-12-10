import React, { useState, useEffect, useRef  } from 'react';
import {StyleSheet, Text } from 'react-native';
import {  Header, Title, Button, Left, Right, Body, Grid, Row, Icon, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalBackground: {
        height: '100%',
        width: '100%'
    },
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
        marginBottom: 16
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
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        lineHeight: 0
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
});

function Picker(props) {
    const [fontLoaded, setFontLoaded] = useState(false);

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <View style={styles.modalBackground}>
            <View style={styles.modalContentContainer}>
                <Text style={fontLoaded ? [styles.title, styles.fontStyle] : null}>Choose your Theme</Text>
                <Grid>
                    {props.items.map((item, index) => {
                        return (
                            <Row style={styles.rowContainer} key={index}>
                                <Text style={fontLoaded ? [styles.subtitle, styles.fontStyle] : null}>
                                    {item}
                                </Text>
                            </Row>
                        );
                    })}
                </Grid>
            </View>
        </View>
    );
}

export default Picker;