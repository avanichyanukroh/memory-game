import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image
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
      backgroundColor: '#ff0000',
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

    handleFlipCard() {
        if (!this.props.isFlipped) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        }
        else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    componentDidUpdate() {
        console.log('FlipCard Render()');
        this.handleFlipCard();
    }
        // else {
        //     // console.log('flipCard() ELSE');
        //     Animated.spring(animatedValue, {
        //         toValue: 180,
        //         friction: 8,
        //         tension: 10
        //     }).start();
        // }
    // useEffect(() => {
    //     setCardInitialized(true);
    // }, []);

    // useEffect(() => {
    //     flipCard();
    // }, [isFlipped]);

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
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <LinearGradient
                            colors={['#216583', '#48A6CF']}
                            style={styles.linearGradientContainer}
                        >
                            <Image style={styles.logo} source={logo} />
                        </LinearGradient>
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Image
                            style={{width: '100%', height: '100%'}}
                            source={nameToUrlMap[`${this.props.value}`]}
                            resizeMode={'cover'}
                        />
                </Animated.View>
              </View>
            </View>
          );
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        isFlipped: state[`cardFlip${ownProps.index}`]
    };
}
    
export default connect(mapStateToProps)(FlipCard);

const nameToUrlMap = {
    australianShepherd: require('../assets/images/puppies/australian-shepherd.jpg'),
    corgi: require('../assets/images/puppies/corgi.jpg'),
    frenchie: require('../assets/images/puppies/frenchie.jpg'),
    goldenRetriever: require('../assets/images/puppies/golden-retriever.jpg'),
    husky: require('../assets/images/puppies/husky.jpg'),
    labrador: require('../assets/images/puppies/labrador.jpg'),
    pug: require('../assets/images/puppies/pug.jpg'),
    rottweiler: require('../assets/images/puppies/rottweiler.jpg')
}