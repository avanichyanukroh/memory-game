import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import FlipCard from '../components/FlipCard';
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
    setInitializeGame,
    setCardShuffle,
    incrTurnCount,
    setMatchCompare,
    setInitializeRound
} from '../redux/actions';

import GameLogicController from '../components/GameLogicController';
import GameResultsModal from '../components/GameResultsModal';
import GameHeader from '../components/GameHeader';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor: '#454d66'
    },
    gameIntro: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 48,
        lineHeight: 0,
        marginBottom: 16,
        padding: 16
    },
    linearGradientContainer: {
        height: '100%',
        width: '100%'
    },
    gridContainer: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    rowContainer: {
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
  });

function GameSession(props) {
    const dispatch = useDispatch();

    const cardShuffle = useSelector(store => store.cardShuffle);
    const matchCompare = useSelector(store => store.matchCompare);
    const initializeGame = useSelector(store => store.initializeGame);
    const round = useSelector(store => store.round);

    const [fadeAnim] = useState(new Animated.Value(1));
    const [introDisplay, setIntroDisplay] = useState(true);
    const [introText, setIntroText] = useState('Round 1');
    const [fontLoaded, setFontLoaded] = useState(false);

    const cardFlipActions = [
        () => {
            dispatch(setCardFlip0(true));
            dispatch(setMatchCompare([...matchCompare, {index: 0, value: cardData[0].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip1(true));
            dispatch(setMatchCompare([...matchCompare, {index: 1, value: cardData[1].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip2(true));
            dispatch(setMatchCompare([...matchCompare, {index: 2, value: cardData[2].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip3(true));
            dispatch(setMatchCompare([...matchCompare, {index: 3, value: cardData[3].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip4(true));
            dispatch(setMatchCompare([...matchCompare, {index: 4, value: cardData[4].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip5(true));
            dispatch(setMatchCompare([...matchCompare, {index: 5, value: cardData[5].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip6(true));
            dispatch(setMatchCompare([...matchCompare, {index: 6, value: cardData[6].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip7(true));
            dispatch(setMatchCompare([...matchCompare, {index: 7, value: cardData[7].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip8(true));
            dispatch(setMatchCompare([...matchCompare, {index: 8, value: cardData[8].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip9(true));
            dispatch(setMatchCompare([...matchCompare, {index: 9, value: cardData[9].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip10(true));
            dispatch(setMatchCompare([...matchCompare, {index: 10, value: cardData[10].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip11(true));
            dispatch(setMatchCompare([...matchCompare, {index: 11, value: cardData[11].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip12(true));
            dispatch(setMatchCompare([...matchCompare, {index: 12, value: cardData[12].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip13(true));
            dispatch(setMatchCompare([...matchCompare, {index: 13, value: cardData[13].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip14(true));
            dispatch(setMatchCompare([...matchCompare, {index: 14, value: cardData[14].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip15(true));
            dispatch(setMatchCompare([...matchCompare, {index: 15, value: cardData[15].name}]));
            dispatch(incrTurnCount());
        }
    ]

    function shuffle(arr) {
        let i,
            j,
            temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;    
    };

    function randomizeData(data) {
        let shuffle1 = shuffle(data);
        let shuffle2 = shuffle(shuffle1);
        return shuffle2;
    }

    function renderGameGridRow(row) {
        if (!cardShuffle) {
            randomizeData(cardData);
            dispatch(setCardShuffle(true));
        }

        let data = cardData;
        let startIndex = (row - 1) * 4;
        let endIndex = (row - 1) * 4 + 3;
        let gameGrid = [];
        let valuePairTracker = {};

        if (round === 1) {
            for (let i = startIndex; i <= endIndex; i++) {
                gameGrid.push(
                    <View
                        key={i}
                    >
                        <FlipCard
                            key={i}
                            value={data[i].name}
                            isImage={true}
                            index={i}
                            cardFlipAction={cardFlipActions[i]}
                        />
                    </View>
                );
            }
        }

        if (round === 2) {
            for (let i = startIndex; i <= endIndex; i++) {
                gameGrid.push(
                    <View
                        key={i}
                    >
                        <FlipCard
                            key={i}
                            value={data[i].name}
                            isImage={false}
                            index={i}
                            cardFlipAction={cardFlipActions[i]}
                        />
                    </View>
                );
            }
        }

        if (round === 3) {
            for (let i = startIndex; i <= endIndex; i++) {
                console.log(valuePairTracker);
                gameGrid.push(
                    <View
                        key={i}
                    >
                        <FlipCard
                            key={i}
                            value={data[i].name}
                            isImage={valuePairTracker[data[i].name] ? true : false}
                            index={i}
                            cardFlipAction={cardFlipActions[i]}
                        />
                    </View>
                );
                
                if (!valuePairTracker[data[i].name]) {
                    valuePairTracker[data[i].name] = true;
                }
            }
        }

        return gameGrid;
    }

    function handleIntroAnimation() {
        setIntroText(`Round ${round}`)
        setTimeout(() => setIntroText('Ready?'), 1000);
        setTimeout(() => setIntroText('Set'), 2000);
        setTimeout(() => {
            setIntroText('Go!');
        Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 400,
            }
          ).start();
          setTimeout(() => handleGameInitialization(), 300);
        }, 3000);
        
    }

    function handleGameInitialization() {
        setIntroDisplay(false);
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1,
            }
        ).start();

        dispatch(setInitializeGame(true));
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
        if (!initializeGame && round < 3) {
            setIntroDisplay(true);
            setTimeout(() => handleIntroAnimation(), 1000);
        }
    }, [initializeGame]);

    useEffect(() => {
        if (!initializeGame && round === 2) {
            setIntroText('Round 2');
            setIntroDisplay(true);
            setTimeout(() => handleIntroAnimation(), 1000);
            cardData = [
                {
                    name: 'red'
                },
                {
                    name: 'red'
                },
                {
                    name: 'blue'
                },
                {
                    name: 'blue'
                },
                {
                    name: 'green'
                },
                {
                    name: 'green'
                },
                {
                    name: 'purple'
                },
                {
                    name: 'purple'
                },
                {
                    name: 'orange'
                },
                {
                    name: 'orange'
                },
                {
                    name: 'pink'
                },
                {
                    name: 'pink'
                },
                {
                    name: 'yellow'
                },
                {
                    name: 'yellow'
                },
                {
                    name: 'white'
                },
                {
                    name: 'white'
                }
            ];
            dispatch(setCardShuffle(false));
        }
    }, [initializeGame, round]);

    useEffect(() => {
        if (!initializeGame && round === 3) {
            setIntroText('Round 3');
            setIntroDisplay(true);
            setTimeout(() => handleIntroAnimation(), 1000);
            cardData = [
                {
                    name: 'baseball'
                },
                {
                    name: 'baseball'
                },
                {
                    name: 'basketball'
                },
                {
                    name: 'basketball'
                },
                {
                    name: 'football'
                },
                {
                    name: 'football'
                },
                {
                    name: 'hockey'
                },
                {
                    name: 'hockey'
                },
                {
                    name: 'lacrosse'
                },
                {
                    name: 'lacrosse'
                },
                {
                    name: 'soccer'
                },
                {
                    name: 'soccer'
                },
                {
                    name: 'tennis'
                },
                {
                    name: 'tennis'
                },
                {
                    name: 'volleyball'
                },
                {
                    name: 'volleyball'
                }
            ];
            dispatch(setCardShuffle(false));
        }
    }, [initializeGame, round]);

    return (
        <Container>
            {introDisplay ? 
                <Animated.View style={[styles.gameIntro, {opacity: fadeAnim}]}>
                    <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>{introText}</Text>
                </Animated.View>
                : null
            }

            <GameLogicController setInitializeGame={setInitializeGame} history={props.history} />
            <GameResultsModal history={props.history} />
            <GameHeader history={props.history} />
            <View style={styles.contentContainer}>
                <Grid style={styles.gridContainer}>
                    <Row style={styles.rowContainer}>
                        {renderGameGridRow(1)}
                    </Row>
                    <Row style={styles.rowContainer}>
                        {renderGameGridRow(2)}
                    </Row>
                    <Row style={styles.rowContainer}>
                        {renderGameGridRow(3)}
                    </Row>
                    <Row style={styles.rowContainer}>
                        {renderGameGridRow(4)}
                    </Row>
                </Grid>
            </View>
      </Container>
    );
}

export default GameSession;

// 4x4 match, 8 pairs
let cardData = [
    {
        name: 'australianShepherd'
    },
    {
        name: 'australianShepherd'
    },
    {
        name: 'corgi'
    },
    {
        name: 'corgi'
    },
    {
        name: 'frenchie'
    },
    {
        name: 'frenchie'
    },
    {
        name: 'goldenRetriever'
    },
    {
        name: 'goldenRetriever'
    },
    {
        name: 'husky'
    },
    {
        name: 'husky'
    },
    {
        name: 'labrador'
    },
    {
        name: 'labrador'
    },
    {
        name: 'pug'
    },
    {
        name: 'pug'
    },
    {
        name: 'rottweiler'
    },
    {
        name: 'rottweiler'
    }
]