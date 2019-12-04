import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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
    setInitializeGame,
    setCardShuffle,
    incrTurnCount,
    setMatchCompare
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
    }
  });

function GameSession(props) {
    const dispatch = useDispatch();

    const cardShuffle = useSelector(store => store.cardShuffle);
    const matchCompare = useSelector(store => store.matchCompare);

    const cardFlipActions = [
        () => {
            dispatch(setCardFlip0(true));
            dispatch(setMatchCompare([...matchCompare, {index: 0, value: sampleData[0].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip1(true));
            dispatch(setMatchCompare([...matchCompare, {index: 1, value: sampleData[1].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip2(true));
            dispatch(setMatchCompare([...matchCompare, {index: 2, value: sampleData[2].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip3(true));
            dispatch(setMatchCompare([...matchCompare, {index: 3, value: sampleData[3].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip4(true));
            dispatch(setMatchCompare([...matchCompare, {index: 4, value: sampleData[4].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip5(true));
            dispatch(setMatchCompare([...matchCompare, {index: 5, value: sampleData[5].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip6(true));
            dispatch(setMatchCompare([...matchCompare, {index: 6, value: sampleData[6].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip7(true));
            dispatch(setMatchCompare([...matchCompare, {index: 7, value: sampleData[7].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip8(true));
            dispatch(setMatchCompare([...matchCompare, {index: 8, value: sampleData[8].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip9(true));
            dispatch(setMatchCompare([...matchCompare, {index: 9, value: sampleData[9].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip10(true));
            dispatch(setMatchCompare([...matchCompare, {index: 10, value: sampleData[10].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip11(true));
            dispatch(setMatchCompare([...matchCompare, {index: 11, value: sampleData[11].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip12(true));
            dispatch(setMatchCompare([...matchCompare, {index: 12, value: sampleData[12].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip13(true));
            dispatch(setMatchCompare([...matchCompare, {index: 13, value: sampleData[13].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip14(true));
            dispatch(setMatchCompare([...matchCompare, {index: 14, value: sampleData[14].name}]));
            dispatch(incrTurnCount());
        },
        () => {
            dispatch(setCardFlip15(true));
            dispatch(setMatchCompare([...matchCompare, {index: 15, value: sampleData[15].name}]));
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
            randomizeData(sampleData);
            dispatch(setCardShuffle(true));
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