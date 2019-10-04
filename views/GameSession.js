import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View  } from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FlipCard from 'react-native-flip-card'

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
    const [isUnlocked, setUnlocked] = useState(
        {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true
        }
    );
    const [matchCompare, setMatchCompare] = useState([]);

    function flipCard() {
            setUnlocked({0: false})
    }

    function shuffle(arr) {
        var i,
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

    function compareCards(i, value) {
        console.log(isFlipped[i]);
        if (isFlipped[i] === true) {
            let newArray = matchCompare;
            newArray.push(value);
            setMatchCompare(newArray);
            setUnlocked({0: false});
            setFlipped({0: true})
            console.log(isUnlocked[0]);
        }
    }

    function renderGameGridRow(row) {
        console.log('re-rendered game grid');
        if (row === 1) {
            randomizeData(sampleData)
        }
        let data = sampleData;
        let startIndex = (row - 1) * 4;
        let endIndex = (row - 1) * 4 + 3;
        let gameGrid = [];

        for (let i = startIndex; i <= endIndex; i++) {
            gameGrid.push(
                <View key={i} style={styles.itemContainer}>
                    <FlipCard
                        style={styles.flipCardContainer}
                        flipHorizontal={true}
                        flipVertical={false}
                        flip={isFlipped[i]}
                        clickable={isUnlocked[i]}
                        onFlipEnd={() => compareCards(i, data[i].name)}
                    >
                        {/* Face Side */}
                        <Container style={[styles.card, styles.backFace]}>
                            <Text>???????</Text>
                        </Container>
                        {/* Back Side */}
                        <Container style={[styles.card, styles.frontFace]}>
                            <Text>{data[i].name}</Text>
                        </Container>
                    </FlipCard>
                </View>
            );
        }
        return gameGrid;
    }
    return (
        <Container>
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
                <Button onPress={flipCard}>
                    <Text>{isFlipped[1]}</Text>
                </Button>
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