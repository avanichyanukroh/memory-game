import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef  } from 'react';
import {StyleSheet, Modal, Text, TouchableHighlight, View } from 'react-native';
import { Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import {
    setCardFlip0,
    setCardFlip1,
    setCardFlip2,
    setCardFlip3,
    setCardFlip4,
    setCardFlip5,
    setCardFlip6,
    setCardFlip7,
    setCardFlip8,
    setCardFlip9,
    setCardFlip10,
    setCardFlip11,
    setCardFlip12,
    setCardFlip13,
    setCardFlip14,
    setCardFlip15,
    setMatchCompare,
    incrMatchCount,
    incrTimer,
    restartGameSession
} from '../redux/actions';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalBackground: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    modalContentContainer: {
        textAlign: 'center',
        backgroundColor: '#000028',
        marginTop: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 32,
        height: '60%',
        width: '70%',
        borderRadius: 4
    },
    title: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 48,
        lineHeight: 0,
        marginBottom: 16,
        // textShadowColor: 'rgba(0, 0, 0, 0.75)',
        // textShadowOffset: {width: 5, height: 5},
        // textShadowRadius: 6
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        lineHeight: 0,
        marginBottom: 16,
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

const GameLogicController = React.memo(forwardRef((props, ref) => {
    const dispatch = useDispatch();
    let handleTimer = useRef(null);

    const matchCompare = useSelector(store => store.matchCompare);
    const matchCount = useSelector(store => store.matchCount);
    const initializeGame = useSelector(store => store.initializeGame);

    const [fontLoaded, setFontLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const cardFlipActions = [
        () => dispatch(setCardFlip0(false)),
        () => dispatch(setCardFlip1(false)),
        () => dispatch(setCardFlip2(false)),
        () => dispatch(setCardFlip3(false)),
        () => dispatch(setCardFlip4(false)),
        () => dispatch(setCardFlip5(false)),
        () => dispatch(setCardFlip6(false)),
        () => dispatch(setCardFlip7(false)),
        () => dispatch(setCardFlip8(false)),
        () => dispatch(setCardFlip9(false)),
        () => dispatch(setCardFlip10(false)),
        () => dispatch(setCardFlip11(false)),
        () => dispatch(setCardFlip12(false)),
        () => dispatch(setCardFlip13(false)),
        () => dispatch(setCardFlip14(false)),
        () => dispatch(setCardFlip15(false))
    ]

    useImperativeHandle(ref, (index, value) => ({
        addToMatchCompare(index, value) {
            dispatch(setMatchCompare([...matchCompare, {index: index, value: value}]))
        }
        
    }))
    
    function handleMatchCompare() {
        console.log('handleMatchCompare() ', matchCompare[0].value, '===', matchCompare[1].value);
        if (matchCompare[0].value === matchCompare[1].value) {
            dispatch(setMatchCompare([]));
            dispatch(incrMatchCount());
        }
        else {
            cardFlipActions[matchCompare[0].index]();
            cardFlipActions[matchCompare[1].index]();
            dispatch(setMatchCompare([]));
        }
    }

    function handleConseal() {
        console.log('handleConceal()');
        cardFlipActions[0]();
        cardFlipActions[1]();
        cardFlipActions[2]();
        cardFlipActions[3]();
        cardFlipActions[4]();
        cardFlipActions[5]();
        cardFlipActions[6]();
        cardFlipActions[7]();
        cardFlipActions[8]();
        cardFlipActions[9]();
        cardFlipActions[10]();
        cardFlipActions[11]();
        cardFlipActions[12]();
        cardFlipActions[13]();
        cardFlipActions[14]();
        cardFlipActions[15]();
    }
    
    function handleCardReveal() {
        console.log('handleReveal()');
        dispatch(setCardFlip0(true));
        dispatch(setCardFlip1(true));
        dispatch(setCardFlip2(true));
        dispatch(setCardFlip3(true));
        dispatch(setCardFlip4(true));
        dispatch(setCardFlip5(true));
        dispatch(setCardFlip6(true));
        dispatch(setCardFlip7(true));
        dispatch(setCardFlip8(true));
        dispatch(setCardFlip9(true));
        dispatch(setCardFlip10(true));
        dispatch(setCardFlip11(true));
        dispatch(setCardFlip12(true));
        dispatch(setCardFlip13(true));
        dispatch(setCardFlip14(true));
        dispatch(setCardFlip15(true));
    }

    function restartGame() {
        dispatch(restartGameSession());
        // props.history.push('/GameSession');
    }

    function redirectMainMenu() {
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
        console.log('initializeGame', initializeGame);
        if (initializeGame) {
            console.log('SET TIME OUT RUN');
            setTimeout(() => {
                handleCardReveal();
              }, 1500);

              setTimeout(() => {
                handleConseal();
              }, 4500);
        }
    }, [initializeGame]);

    useEffect(() => {
        if (matchCompare.length === 2) {
            setTimeout(() => {
                handleMatchCompare();
              }, 600);
        }
    }, [matchCompare]);

    useEffect(() => {
        if (matchCount === 1) {
            clearInterval(handleTimer.current);
            setModalOpen(true);
        }
        if (matchCompare !== 8 && modalOpen) {
            setModalOpen(false);
        }
    }, [matchCount]);

    useEffect(() => {
        if (initializeGame) {
            handleTimer.current = setInterval(() => dispatch(incrTimer()), 1000);
        }

    }, [initializeGame]);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                // onRequestClose={() => {
                // }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContentContainer}>
                        <Text style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>Victory!</Text>
                        <Text style={fontLoaded ? [styles.text, {fontFamily: 'Bangers'}] : null}>
                            Highest Score
                        </Text>
                        <Text style={fontLoaded ? [styles.text, {fontFamily: 'Bangers'}] : null}>
                            Fastest Time: 100
                        </Text>
                        <Button style={[styles.button, styles.playButton]} onPress={restartGame}>
                            <Text style={fontLoaded ? [styles.playButtonText, {fontFamily: 'Bangers'}] : null}>Play Again!</Text>
                        </Button>
                        <Button style={[styles.button, styles.themeButton]} onPress={redirectMainMenu}>
                            <Text style={fontLoaded ? [styles.themeButtonText, {fontFamily: 'Bangers'}] : null}>Main Menu</Text>
                        </Button>
                        {/* <TouchableHighlight
                            onPress={() => {
                                
                            }}
                        >
                            <Text>Hide Modal</Text>
                        </TouchableHighlight> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
}))

export default GameLogicController;
