import React from 'react';
import { Link } from 'react-router-native';

import { StyleSheet, Image } from 'react-native';
import { Container, Content, H1, H3, Button, Text } from 'native-base';
import menuLogo from '../assets/images/brain-menu-logo.png';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#216583',
        padding: 64
    },
    content:  {
        // display: 'flex',
        // justifyContent: 'flex-end'
    },
    title: {
        textAlign: 'center',
        color: 'white'
    },
    menuLogo: {
        height: 250,
        width: 250,
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 48,
        marginBottom: 48
    },
    text: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 32
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8
    },
    buttonText: {
        textAlign: 'center',
        width: 250,
        color: 'white'
    }
});

function MainMenu(props) {
    function intializeGame() {
        props.history.push('/GameSession')
    }
    
    return (
        <Container style={styles.container}>
            <Content style={styles.content}>
                <H1 style={styles.title}>Memory Game</H1>
                <Image style={styles.menuLogo} source={menuLogo} />
                <H3 style={styles.text}>
                    Choose your difficulty!
                </H3>
                
                <Button style={styles.button} onPress={intializeGame}>
                    <Text style={styles.buttonText}>Easy</Text>
                </Button>
                <Button style={styles.button} onPress={intializeGame}>
                    <Text style={styles.buttonText}>Medium</Text>
                </Button>
                <Button style={styles.button} onPress={intializeGame}>
                    <Text style={styles.buttonText}>Hard</Text>
                </Button>
            </Content>
      </Container>
    );
}

export default MainMenu;
