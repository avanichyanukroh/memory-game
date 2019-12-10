import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {  Text, Button, View, List, ListItem, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { getLeaderBoard } from '../redux/APIActions';

import { setError } from '../redux/actions';

import * as Font from 'expo-font';

const styles = StyleSheet.create({
    modalContainer: {
        textAlign: 'center',
        backgroundColor: 'black',
        marginTop: '25%',
        marginBottom: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 32,
        height: '70%',
        width: '80%',
        borderRadius: 4
    },
    contentContainer: {
        position: 'absolute',
        top: 50,
        bottom: 32,
        left: 32,
        right: 32,
    },
    title: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 24,
        lineHeight: 0,
        marginTop: 32,
        marginBottom: 32
    },
    subtitle: {
        textAlign: 'center',
        color: '#000028',
        fontSize: 24,
        lineHeight: 0
    },
    rowContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        margin: -24
    },
    exitButton: {
        height: 50,
        width: 50
    },
    exitIcon: {
        color: 'white',
        fontSize: 36
    },
    text: {
        color: 'white',
        fontSize: 14,
        lineHeight: 0,
        letterSpacing: 1
    },
    userScoreContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
});

function LeaderBoard(props) {
    const dispatch = useDispatch();

    const leaderBoard = useSelector(store => store.leaderBoard);
    const loading = useSelector(store => store.loading);
    const error = useSelector(store => store.error);

    const [fontLoaded, setFontLoaded] = useState(false);

    function numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    useEffect(() => {
        dispatch(getLeaderBoard('normal'));
    }, []);

    useEffect(() => {

    }, [error]);

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <View style={styles.modalContainer}>
            {console.log('leaderBoard: ', leaderBoard)}
            <View style={styles.headerContainer}>
                <Button style={styles.exitButton} transparent onPress={props.handleCloseModal}>
                    <Text style={fontLoaded ? [styles.exitIcon, styles.fontStyle] : null}>X</Text>
                </Button>
            </View>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.contentContainer}>
                <Text style={fontLoaded ? [styles.title, styles.fontStyle] : null}>Leader Board</Text>
                    <List>
                        {loading ?
                            <Spinner color='white' />
                            :
                            leaderBoard === 'leaderBoard' ?
                                leaderBoard.map((userScore, index) => (
                                    <ListItem style={styles.userScoreContainer} key={index}>
                                        <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>{index + 1}) {userScore.user.username}</Text>
                                        <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>{userScore.score} PTS</Text>
                                    </ListItem>
                                ))
                                :
                                <ListItem style={styles.userScoreContainer}>
                                    <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>No scores currently posted</Text>
                                </ListItem>
                        }
                    </List>
            </ScrollView>
        </View>
    );
}

export default LeaderBoard;