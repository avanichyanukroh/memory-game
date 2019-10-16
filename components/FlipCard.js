import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 8
    },
    flipCard: {
      height: 120,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      backfaceVisibility: 'hidden',
    },
    flipCardBack: {
      backgroundColor: "red",
      position: "absolute",
      top: 0,
    },
    flipText: {
      fontSize: 12,
      color: 'white'
    }
  });

function FlipCard(props) {
  
//   componentWillMount() {
//     animatedValue = new Animated.Value(0);
//     value = 0;
//     animatedValue.addListener(({ value }) => {
//       value = value;
//     })
//     frontInterpolate = animatedValue.interpolate({
//       inputRange: [0, 180],
//       outputRange: ['0deg', '180deg'],
//     })
//     backInterpolate = animatedValue.interpolate({
//       inputRange: [0, 180],
//       outputRange: ['180deg', '360deg']
//     })
//   }

//   const [flipAnimation] = useState(new Animated.Value(0));
    const animatedValue = new Animated.Value(0);
    // animatedValue.addListener(({ value }) => {
    //     value = value;
    // })
    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    })
    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    })

    function flipCard() {
        console.log('flipCard() ran');
        if (!props.isFlipped) {
            console.log('flipCard() TRUE');
            Animated.spring(animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start((callback) => console.log('THIS HAPPENS AFTER ANIMATION', callback));
        }
        
        if (props.isFlipped) {
            console.log('flipCard() FALSE');
            Animated.spring(animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    useEffect(() => {
        flipCard();
    }, [props.isFlipped]);

    const frontAnimatedStyle = {
      transform: [
        { rotateY: frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: backInterpolate }
      ]
    }
    
    return (
      <View style={styles.container}>
        <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>
                Memory!
            </Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
                {props.value}
            </Text>
        </Animated.View>
        </View>
      </View>
    );

}

export default FlipCard;