import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import logo from '../assets/images/brand/logo.png';
import { LinearGradient } from 'expo-linear-gradient';
import {  connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8
    },
    linearGradientContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipCardContainer: {
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 0 }
    },
    flipCard: {
      height: 120,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backfaceVisibility: 'hidden',
      borderRadius: 4,
      overflow: 'hidden'
    },
    flipCardBack: {
      position: "absolute",
      top: 0
    },
    logo: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
    }
  });

class FlipCard extends Component {
    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    handleCardOnPress() {
    }

    handleFlipCard() {
        if (!this.props.isFlipped) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 20
            }).start();
        }
        else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 20
            }).start();
        }
    }

    componentDidUpdate() {
        this.handleFlipCard();
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate}
            ]
          }
          const backAnimatedStyle = {
            transform: [
              { rotateY: this.backInterpolate }
            ]
          }

        return (
            <View style={styles.container}>
                <View style={styles.flipCardContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            (!this.props.isFlipped && this.props.matchCompare.length !== 2) ? 
                                this.props.cardFlipAction()
                                :
                                null
                        }}
                        style={{
                            position: 'relative',
                            zIndex: 10
                        }}
                    >
                        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                                <LinearGradient
                                    colors={['#216583', '#48A6CF']}
                                    style={styles.linearGradientContainer}
                                >
                                    <Image style={styles.logo} source={logo} />
                                </LinearGradient>
                        </Animated.View>
                    </TouchableOpacity>
                    <Animated.View
                        style={[
                            backAnimatedStyle,
                            styles.flipCard,
                            styles.flipCardBack,
                            {backgroundColor: this.props.backgroundColor}
                        ]}
                    >
                        {this.props.isImage ?
                            <Image
                                style={{width: '100%', height: '100%'}}
                                source={valueToUrlMap[`${this.props.value}`]}
                                resizeMode={'cover'}
                            />
                            :
                            <Text
                                style={[styles.cardText, {color: this.props.textColor}]}
                            >
                                {valueToTextMap[`${this.props.value}`]}
                            </Text>
                        }
                    </Animated.View>
                </View>
            </View>
          );
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        isFlipped: state[`cardFlip${ownProps.index}`],
        matchCompare: state.matchCompare
    };
}

export default connect(mapStateToProps)(FlipCard);

const valueToUrlMap = {
    australianShepherd: require('../assets/images/puppies/australian-shepherd.jpg'),
    corgi: require('../assets/images/puppies/corgi.jpg'),
    frenchie: require('../assets/images/puppies/frenchie.jpg'),
    goldenRetriever: require('../assets/images/puppies/golden-retriever.jpg'),
    husky: require('../assets/images/puppies/husky.jpg'),
    labrador: require('../assets/images/puppies/labrador.jpg'),
    pug: require('../assets/images/puppies/pug.jpg'),
    rottweiler: require('../assets/images/puppies/rottweiler.jpg'),
    baseball: require('../assets/images/sports/baseball.jpg'),
    basketball: require('../assets/images/sports/basketball.jpg'),
    football: require('../assets/images/sports/football.jpg'),
    hockey: require('../assets/images/sports/hockey.jpg'),
    lacrosse: require('../assets/images/sports/lacrosse.jpg'),
    soccer: require('../assets/images/sports/soccer.jpg'),
    tennis: require('../assets/images/sports/tennis.jpg'),
    volleyball: require('../assets/images/sports/volleyball.jpg')
}

const valueToTextMap = {
    australianShepherd: 'Australian Shepherd',
    corgi: 'Corgi',
    frenchie: 'Frenchie',
    goldenRetriever: 'Golden Retriever',
    husky: 'Husky',
    labrador: 'Labrador',
    pug: 'Pug',
    rottweiler: 'Rottweiler',
    baseball: 'Baseball',
    basketball: 'Basketball',
    football: 'Football',
    hockey: 'Hockey',
    lacrosse: 'Lacrosse',
    soccer: 'Soccer',
    tennis: 'Tennis',
    volleyball: 'Volleyball',
    red: 'Red',
    blue: 'Blue',
    green: 'Green',
    purple: 'Purple',
    orange: 'Orange',
    pink: 'Pink',
    yellow: 'Yellow',
    white: 'White'
}