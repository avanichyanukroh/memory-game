import React, { useState, useEffect, useRef  } from 'react';
import {StyleSheet, Modal, Text } from 'react-native';
import { Button, Grid, Row, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { updateHighScore } from '../redux/APIActions';
import {
    incrTimer,
    restartGameSession
} from '../redux/actions';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalBackground: {
        height: '100%',
        width: '100%'
    },
    modalContentContainer: {
        textAlign: 'center',
        backgroundColor: '#000028',
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
        color: '#fbe555',
        fontSize: 48,
        lineHeight: 0,
        marginBottom: 16
    },
    subtitle: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 24,
        lineHeight: 0,
        marginBottom: 16
    },
    rowContainer: {
        justifyContent: 'space-evenly'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        lineHeight: 0,
        marginBottom: 16
    },
    text2: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        lineHeight: 0,
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

function GameResultsModal(props) {
    const dispatch = useDispatch();
    let handleTimer = useRef(null);
    
    const user = useSelector(store => store.user);
    const initializeGame = useSelector(store => store.initializeGame);
    const matchCount = useSelector(store => store.matchCount);
    const turnCount = useSelector(store => store.turnCount);
    const timer = useSelector(store => store.timer);
    const highScore = useSelector(store => store.highScore);

    const [fontLoaded, setFontLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    function restartGame() {
        dispatch(restartGameSession());
    }

    function redirectMainMenu() {
        dispatch(restartGameSession());
        props.history.push('/');
    }

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    useEffect(() => {
        if (initializeGame) {
            handleTimer.current = setInterval(() => dispatch(incrTimer()), 1000);
        }

    }, [initializeGame]);

    useEffect(() => {
        if (matchCount === 8) {
            clearInterval(handleTimer.current);
            setModalOpen(true);
            const score = Math.floor((5000 / (turnCount / 2)) + (5000 / timer));

            if (score > highScore.score) {
                const result = {
                    turn: turnCount,
                    time: timer,
                    score: score
                }
                dispatch(updateHighScore(user._id, normal, result));
            }
        }
        if (matchCount !== 8 && modalOpen) {
            setModalOpen(false);
        }
    }, [matchCount]);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContentContainer}>
                        <Text style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>Victory!</Text>
                        <Grid>
                            <Row style={styles.rowContainer}>
                                <Text style={fontLoaded ? [styles.text, {fontFamily: 'Bangers'}] : null}>
                                    Turn: {Math.floor(turnCount / 2)}
                                </Text>
                                <Text style={fontLoaded ? [styles.text, {fontFamily: 'Bangers'}] : null}>
                                    Time: {timer} Sec
                                </Text>
                            </Row>
                        </Grid>
                        <Text style={fontLoaded ? [styles.subtitle, {fontFamily: 'Bangers'}] : null}>
                            {Math.floor((5000 / (turnCount / 2)) + (5000 / timer)) > highScore.score ? 'New High Score!' : 'Total Score'}
                        </Text>
                        <Text style={fontLoaded ? [styles.text2, {fontFamily: 'Bangers'}] : null}>
                            {Math.floor((5000 / (turnCount / 2)) + (5000 / timer))} Pts
                        </Text>
                        <Button style={[styles.button, styles.playButton]} onPress={restartGame}>
                            <Text style={fontLoaded ? [styles.playButtonText, {fontFamily: 'Bangers'}] : null}>Play Again!</Text>
                        </Button>
                        <Button style={[styles.button, styles.themeButton]} onPress={redirectMainMenu}>
                            <Text style={fontLoaded ? [styles.themeButtonText, {fontFamily: 'Bangers'}] : null}>Main Menu</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default GameResultsModal;
