import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {  Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000028'
    },
    title: {
        color: '#fbe555'
    }
  });

function GameHeader() {
    const turnCount = useSelector(store => store.turnCount);
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
        <Header style={styles.header}>
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title style={fontLoaded ? [styles.title, {fontFamily: 'Bangers'}] : null}>
                    Turn: {Math.floor(turnCount / 2)}
                </Title>
            </Body>
            <Right />
        </Header>
    );
}

export default GameHeader;
