import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-native';

import { StyleSheet, Image } from 'react-native';
import { Container, Content, H1, H3, Button, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import menuLogo from '../assets/images/brand/logo.png';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#216583',
        // padding: 64
    },
    linearGradientContainer: {
        height: '100%',
        width: '100%',
        padding: 56
    },
    title: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 64,
        lineHeight: 0,
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 6
    },
    menuLogo: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 36
    },
    highScoreTitle: {
        textAlign: 'center',
        color: 'white',
        marginTop: 32,
        marginBottom: 24
    },
    scoreText: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 16
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 16
    },
    playButton: {
        marginTop: 32,
        backgroundColor: '#ff0000'
    },
    themeButton: {
        backgroundColor: '#fbe555'
    },
    playButtonText: {
        textAlign: 'center',
        width: '100%',
        color: 'white',
        fontSize: 32
    },
    themeButtonText: {
        textAlign: 'center',
        width: '100%',
        color: 'black',
        fontSize: 32
    }
});

function MainMenu(props) {
    const [fontLoaded, setFontLoaded] = useState(false);
    function intializeGame() {
        props.history.push('/GameSession')
    }

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <Container style={styles.container}>
            <LinearGradient
                colors={['#216583', '#48A6CF']}
                style={styles.linearGradientContainer}
            >
                <Image style={styles.menuLogo} source={menuLogo} />
                <H1 style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>FlashBack</H1>
                
                <H3 style={fontLoaded ? [styles.highScoreTitle, {fontFamily: 'Bangers'}] : null}>
                    Highest Score
                </H3>
                <H3 style={fontLoaded ? [styles.scoreText, {fontFamily: 'Bangers'}] : null}>
                    Fastest Time: 100
                </H3>

                {/* <H3 style={styles.text}>
                    Choose your difficulty!
                </H3> */}
                
                {/* <Button style={styles.button} onPress={intializeGame}>
                    <Text style={styles.buttonText}>Easy</Text>
                </Button>
                <Button style={styles.button} onPress={intializeGame}>
                    <Text style={styles.buttonText}>Medium</Text>
                </Button>
                <Button style={styles.button} onPress={intializeGame}>
                    <Text style={styles.buttonText}>Hard</Text>
                </Button> */}
                <Button style={[styles.button, styles.playButton]} onPress={intializeGame}>
                    <Text style={fontLoaded ? [styles.playButtonText, {fontFamily: 'Bangers'}] : null}>Play!</Text>
                </Button>
                <Button style={[styles.button, styles.themeButton]} onPress={intializeGame}>
                    <Text style={fontLoaded ? [styles.themeButtonText, {fontFamily: 'Bangers'}] : null}>Theme: Puppies</Text>
                </Button>
            </LinearGradient>
      </Container>
    );
}

export default MainMenu;
