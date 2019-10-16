import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FlipCard from '../components/FlipCard';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#216583'
    },
    title: {
        color: 'white'
    },
    itemContainer: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    flipCardContainer: {
        margin: 16
    },
    card: {
        height: 120,
        width: 80,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: 'black'
    },
    frontFace: {
        backgroundColor: 'blue'
    },
    backFace: {
        backgroundColor: 'red'
    }
  });

function GameSession() {

    const [initalizeGame, setInitializeGame] = useState(false);
    const [isFlipped, setFlipped] = useState(
        {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: false,
            15: false
        }
    );
    const [touchIsDisabled, setTouchIsDisabled] = useState(
        {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: false,
            15: false
        }
    );
    const [fullTouchDisabled, setFullTouchDisabled] = useState(false);
    const [matchCompare, setMatchCompare] = useState([]);

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

    function handleCardFlip(index, value) {
        if (touchIsDisabled[index] === false) {
            console.log('handleCardFlip at', index, value);
            setMatchCompare([...matchCompare, {index: index, value: value}]);
            setFlipped((prevState) => {
                return  { ...prevState, [index]: true }
            });
            setFullTouchDisabled(true);
            // setTouchIsDisabled((prevState) => {
            //     return  { ...prevState, [index]: true }
            // });
        }
    }

    function handleCardCompare() {
            console.log('comparing values: ', matchCompare[0], matchCompare[1]);
        if (matchCompare[0].value !== matchCompare[1].value) {
            console.log('NOT EQUAL');
            setFlipped((prevState) => {
                return  { ...prevState, [matchCompare[0].index]: false, [matchCompare[1].index]: false }
            });
            // setTouchIsDisabled((prevState) => {
            //     return  { ...prevState, [matchCompare[0].index]: false, [matchCompare[1].index]: false }
            // });
            setMatchCompare([]);
        }
        else {
            console.log('EQUAL');
            setMatchCompare([]);
        }
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
                <TouchableOpacity
                    key={i}
                    activeOpacity={1}
                    onPress={() => handleCardFlip(i, data[i].name)}
                    disabled={isFlipped[i] ? true : fullTouchDisabled}
                >
                    <View style={styles.itemContainer}>
                        <FlipCard
                            isFlipped={isFlipped[i]}
                            touchIsDisabled={touchIsDisabled[i]}
                            value={data[i].name}
                        />
                    </View>
                </TouchableOpacity>
            );
        }
        return gameGrid;
    }

    useEffect(() => {
        // console.log('useEffect()');
        // console.log('matchCompare array: ', matchCompare);
        // console.log('touchIsDisabled: ', touchIsDisabled);
        
        setTimeout(() => {
            setFullTouchDisabled(false);
          }, 1000);

        if (matchCompare.length === 2) {
            setTimeout(() => {
                console.log('now has 2');
                handleCardCompare();
              }, 1000);

        }
    }, [matchCompare]);

    return (
        <Container>
            {console.log('render()')}
            {console.log('touchIsDisabled: ', touchIsDisabled)}
            <Header style={styles.header}>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>Header</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Grid>
                    <Row>
                        {renderGameGridRow(1)}
                    </Row>
                    <Row>
                        {renderGameGridRow(2)}
                    </Row>
                    <Row>
                        {renderGameGridRow(3)}
                    </Row>
                    <Row>
                        {renderGameGridRow(4)}
                    </Row>
                </Grid>
            </Content>
      </Container>
    );
}

export default GameSession;

// 4x4 match, 8 pairs
const sampleData = [
    {
        name: 'dog'
    },
    {
        name: 'dog'
    },
    {
        name: 'cat'
    },
    {
        name: 'cat'
    },
    {
        name: 'cow'
    },
    {
        name: 'cow'
    },
    {
        name: 'bird'
    },
    {
        name: 'bird'
    },
    {
        name: 'snake'
    },
    {
        name: 'snake'
    },
    {
        name: 'fish'
    },
    {
        name: 'fish'
    },
    {
        name: 'fox'
    },
    {
        name: 'fox'
    },
    {
        name: 'bear'
    },
    {
        name: 'bear'
    },
]