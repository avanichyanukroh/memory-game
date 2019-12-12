import React, { useState, useEffect  } from 'react';
import {StyleSheet, ScrollView } from 'react-native';
import { Button, Grid, Row, View, Text } from 'native-base';

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
        right: 32
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
    exitButton: {
        height: 50,
        width: 50
    },
    exitIcon: {
        color: '#ff0000',
        fontSize: 36
    },
    text: {
        color: '#ff0000',
        fontSize: 14,
        lineHeight: 0,
        letterSpacing: 1
    },
    userScoreContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
});

function ThemePicker(props) {
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
        <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
                <Button style={styles.exitButton} transparent onPress={props.handleCloseModal}>
                    <Text style={fontLoaded ? [styles.exitIcon, styles.fontStyle] : null}>X</Text>
                </Button>
            </View>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.contentContainer}>
                <Text style={fontLoaded ? [styles.title, styles.fontStyle] : null}>Coming Soon!</Text>
                {/* <Grid>
                    {props.items.map((item, index) => {
                        return (
                            <Row style={styles.rowContainer} key={index}>
                                <Text style={fontLoaded ? [styles.subtitle, styles.fontStyle] : null}>
                                    {item}
                                </Text>
                            </Row>
                        );
                    })}
                </Grid> */}
            </ScrollView>
        </View>
    );
}

export default ThemePicker;