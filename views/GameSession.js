import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Container } from 'native-base';
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
    incrTurnCount
} from '../redux/actions';
import GameLogicController from '../components/GameLogicController';
import * as Font from 'expo-font';
import GameHeader from '../components/GameHeader';

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor: '#454d66'
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
        justifyContent:'flex-start',
        // borderRadius: 4,
        // borderWidth: 2,
        // borderColor: 'green'
    }
  });

function GameSession(props) {
    const dispatch = useDispatch();
    const gameLogicControllerRef = useRef();

    const cardFlipActions = [
        () => {
            dispatch(setCardFlip0(true));
            gameLogicControllerRef.current.addToMatchCompare(0, sampleData[0].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip1(true));
            gameLogicControllerRef.current.addToMatchCompare(1, sampleData[1].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip2(true));
            gameLogicControllerRef.current.addToMatchCompare(2, sampleData[2].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip3(true));
            gameLogicControllerRef.current.addToMatchCompare(3, sampleData[3].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip4(true));
            gameLogicControllerRef.current.addToMatchCompare(4, sampleData[4].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip5(true));
            gameLogicControllerRef.current.addToMatchCompare(5, sampleData[5].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip6(true));
            gameLogicControllerRef.current.addToMatchCompare(6, sampleData[6].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip7(true));
            gameLogicControllerRef.current.addToMatchCompare(7, sampleData[7].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip8(true));
            gameLogicControllerRef.current.addToMatchCompare(8, sampleData[8].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip9(true));
            gameLogicControllerRef.current.addToMatchCompare(9, sampleData[9].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip10(true));
            gameLogicControllerRef.current.addToMatchCompare(10, sampleData[10].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip11(true));
            gameLogicControllerRef.current.addToMatchCompare(11, sampleData[11].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip12(true));
            gameLogicControllerRef.current.addToMatchCompare(12, sampleData[12].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip13(true));
            gameLogicControllerRef.current.addToMatchCompare(13, sampleData[13].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip14(true));
            gameLogicControllerRef.current.addToMatchCompare(14, sampleData[14].name);
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip15(true));
            gameLogicControllerRef.current.addToMatchCompare(15, sampleData[15].name);
            dispatch(incrTurnCount());
        }
    ]

    const [initalizeGame, setInitializeGame] = useState(false);

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
        if (initalizeGame === false) {
            randomizeData(sampleData);
            setInitializeGame(true);
        }
        let data = sampleData;
        let startIndex = (row - 1) * 4;
        let endIndex = (row - 1) * 4 + 3;
        let gameGrid = [];

        for (let i = startIndex; i <= endIndex; i++) {
            gameGrid.push(
                <View
                    key={i}
                >
                        <FlipCard
                            key={i}
                            value={data[i].name}
                            index={i}
                            cardFlipAction={cardFlipActions[i]}
                        />
                </View>
            );
        }
        return gameGrid;
    }

    return (
        <Container>
            <GameLogicController ref={gameLogicControllerRef} />
            <GameHeader />
            <View style={styles.contentContainer}>
                {/* <LinearGradient
                                colors={['#900048', '#ff4057']}
                                style={styles.linearGradientContainer}
                > */}
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
                {/* </LinearGradient> */}
            </View>
      </Container>
    );
}

export default GameSession;

// 4x4 match, 8 pairs
const sampleData = [
    {
        name: 'australianShepherd',
        url: require('../assets/images/puppies/australian-shepherd.jpg')
    },
    {
        name: 'australianShepherd',
        url: require('../assets/images/puppies/australian-shepherd.jpg')
    },
    {
        name: 'corgi',
        url: require('../assets/images/puppies/corgi.jpg')
    },
    {
        name: 'corgi',
        url: require('../assets/images/puppies/corgi.jpg')
    },
    {
        name: 'frenchie',
        url: require('../assets/images/puppies/frenchie.jpg')
    },
    {
        name: 'frenchie',
        url: require('../assets/images/puppies/frenchie.jpg')
    },
    {
        name: 'goldenRetriever',
        url: require('../assets/images/puppies/golden-retriever.jpg')
    },
    {
        name: 'goldenRetriever',
        url: require('../assets/images/puppies/golden-retriever.jpg')
    },
    {
        name: 'husky',
        url: require('../assets/images/puppies/husky.jpg')
    },
    {
        name: 'husky',
        url: require('../assets/images/puppies/husky.jpg')
    },
    {
        name: 'labrador',
        url: require('../assets/images/puppies/labrador.jpg')
    },
    {
        name: 'labrador',
        url: require('../assets/images/puppies/labrador.jpg')
    },
    {
        name: 'pug',
        url: require('../assets/images/puppies/pug.jpg')
    },
    {
        name: 'pug',
        url: require('../assets/images/puppies/pug.jpg')
    },
    {
        name: 'rottweiler',
        url: require('../assets/images/puppies/rottweiler.jpg')
    },
    {
        name: 'rottweiler',
        url: require('../assets/images/puppies/rottweiler.jpg')
    }
]