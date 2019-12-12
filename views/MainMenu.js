import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet, Image, View, Modal } from 'react-native';
import { Container, H1, H3, Button, Text, Badge } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import menuLogo from '../assets/images/brand/logo.png';

import { getHighScore } from '../redux/APIActions';
import { setCardTheme, setError } from '../redux/actions';

import * as Font from 'expo-font';
import ThemePicker from '../components/ThemePicker';
import Login from '../components/Login';
import LeaderBoard from '../components/LeaderBoard';
import User from '../components/User';

const styles = StyleSheet.create({
    linearGradientContainer: {
        height: '100%',
        width: '100%'
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8
    },
    contentContainer: {
        padding: 32
    },
    loginButton: {
        borderColor: '#61f2f5'
    },
    leaderBoardButton: {
        borderColor: '#61f2f5'
    },
    title: {
        textAlign: 'center',
        color: '#fbe555',
        fontSize: 64,
        lineHeight: 0,
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 6
    },
    menuLogo: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 36
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
        marginTop: 8,
        marginBottom: 8
    },
    text: {
        textAlign: 'center',
        color: '#61f2f5'
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
    },
    highScoreText: {
        color: 'black',
        fontSize: 20,
        lineHeight: 0
    },
    badge: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fbe555'
    },
    fontStyle: {
        fontFamily: 'Bangers',
        letterSpacing: 1
    }
});

function MainMenu(props) {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const highScore = useSelector(store => store.highScore);
    // const cardTheme = useSelector(store => store.cardTheme);

    const [fontLoaded, setFontLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    function initializeGame() {
        props.history.push('/GameSession');
    }

    function handleOpenModal(content) {
        setModalContent(content);
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
        dispatch(setError(null));
    }

    function renderHighScore() {
        if (!user) {
            return (
                <View>
                    <H3 style={fontLoaded ? [styles.subtitle, styles.fontStyle] : null}>
                        Score tracking unavailable, please login to enable
                    </H3>
                </View>
            );
        }
        else if (highScore === null || highScore === '') {
            return (
                <View>
                    <H3 style={fontLoaded ? [styles.subtitle, styles.fontStyle] : null}>
                        No high score, please play your first game
                    </H3>
                </View>
            );
        }
        else {
            return (
                <View>
                    <H3 style={fontLoaded ? [styles.subtitle, styles.fontStyle] : null}>
                        Highest Score:
                    </H3>
                    <Badge style={styles.badge}>
                        <Text
                            style={
                                fontLoaded ?
                                [styles.highScoreText, styles.fontStyle]
                                : null
                            }
                        >
                            {highScore.score} Pts
                        </Text>
                    </Badge>
                </View>
            );
        }
    }

    function renderModalContent() {
        switch (modalContent) {
            case 'login':
                return <Login handleCloseModal={handleCloseModal} />;
                break;
            case 'theme':
                return <ThemePicker handleCloseModal={handleCloseModal} />;
                break;
            case 'leaderBoard':
                return <LeaderBoard handleCloseModal={handleCloseModal} />;
                break;
            case 'user':
                return <User handleCloseModal={handleCloseModal} />;
                break;
            default:
                return null;
        }
    }

    async function loadFont() {
        await Font.loadAsync({
            Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
        });
    }

    useEffect(() => {
        if (user) {
            dispatch(getHighScore(user._id, 'normal'));
        }
    }, [user]);

    useEffect(() => {
        loadFont().then(() =>setFontLoaded(true));
    }, []);

    return (
        <Container>
            <LinearGradient
                colors={['#216583', '#48A6CF']}
                style={styles.linearGradientContainer}
            >
                <View style={styles.headerContainer}>
                    {user ?
                        (<Button style={styles.loginButton} bordered onPress={() => handleOpenModal('user')}>
                            <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>{user.username}</Text>
                        </Button>)
                        :
                        (<Button style={styles.loginButton} bordered onPress={() => handleOpenModal('login')}>
                            <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>Login</Text>
                        </Button>)
                }
                    
                    <Button style={styles.leaderBoardButton} bordered onPress={() => handleOpenModal('leaderBoard')}>
                        <Text style={fontLoaded ? [styles.text, styles.fontStyle] : null}>Leader Board</Text>
                    </Button>
                </View>
                <View style={styles.contentContainer}>
                    <Image style={styles.menuLogo} source={menuLogo} />
                    <H1 style={fontLoaded ? [styles.title, styles.fontStyle] : null}>FlashBack</H1>
                    {renderHighScore()}
                    <Button style={[styles.button, styles.playButton]} onPress={initializeGame}>
                        <Text style={fontLoaded ? [styles.playButtonText, styles.fontStyle] : null}>Play!</Text>
                    </Button>
                    <Button style={[styles.button, styles.themeButton]} onPress={() => handleOpenModal('theme')}>
                        <Text style={fontLoaded ? [styles.themeButtonText, styles.fontStyle] : null}>Card Theme</Text>
                    </Button>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalOpen}
                >
                    {renderModalContent()}
                </Modal>
            </LinearGradient>
      </Container>
    );
}

export default MainMenu;
