import React from 'react';
import { StyleSheet, TouchableOpacity  } from 'react-native';

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
    flipCardContainer: {
        margin: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
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

    function randomizeData() {
        let shuffle1 = shuffle(sampleData);
        let shuffle2 = shuffle(shuffle1);
        return shuffle2;
    }

    function renderGameGridRow(row) {
        let data = sampleData;
        let startIndex = (row - 1) * 4;
        let endIndex = (row - 1) * 4 + 3;
        let gameGrid = [];

        for (let i = startIndex; i <= endIndex; i++) {
            gameGrid.push(
                <FlipCard
                    style={styles.flipCardContainer}
                    key={i}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
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