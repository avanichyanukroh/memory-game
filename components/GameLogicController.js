import React, { useState, useEffect  } from 'react';
import {StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    setCardFlip0,
    setCardFlip1,
    setCardFlip2,
    setCardFlip3,
    setCardFlip4,
    setCardFlip5,
    setCardFlip6,
    setCardFlip7,
    setCardFlip8,
    setCardFlip9,
    setCardFlip10,
    setCardFlip11,
    setCardFlip12,
    setCardFlip13,
    setCardFlip14,
    setCardFlip15,
    setMatchCompare,
    incrMatchCount,
    setInitializeGame
} from '../redux/actions';

const styles = StyleSheet.create({

});

function GameLogicController(props) {
    const dispatch = useDispatch();

    const matchCompare = useSelector(store => store.matchCompare);
    const initializeGame = useSelector(store => store.initializeGame);
    const cardShuffle = useSelector(store => store.cardShuffle);

    const cardFlipActions = [
        () => dispatch(setCardFlip0(false)),
        () => dispatch(setCardFlip1(false)),
        () => dispatch(setCardFlip2(false)),
        () => dispatch(setCardFlip3(false)),
        () => dispatch(setCardFlip4(false)),
        () => dispatch(setCardFlip5(false)),
        () => dispatch(setCardFlip6(false)),
        () => dispatch(setCardFlip7(false)),
        () => dispatch(setCardFlip8(false)),
        () => dispatch(setCardFlip9(false)),
        () => dispatch(setCardFlip10(false)),
        () => dispatch(setCardFlip11(false)),
        () => dispatch(setCardFlip12(false)),
        () => dispatch(setCardFlip13(false)),
        () => dispatch(setCardFlip14(false)),
        () => dispatch(setCardFlip15(false))
    ]
    
    function handleMatchCompare() {
        console.log('handleMatchCompare() ', matchCompare[0].value, '===', matchCompare[1].value);
        if (matchCompare[0].value === matchCompare[1].value) {
            dispatch(setMatchCompare([]));
            dispatch(incrMatchCount());
        }
        else {
            cardFlipActions[matchCompare[0].index]();
            cardFlipActions[matchCompare[1].index]();
            dispatch(setMatchCompare([]));
        }
    }

    function handleConseal() {
        console.log('handleConceal()');
        cardFlipActions[0]();
        cardFlipActions[1]();
        cardFlipActions[2]();
        cardFlipActions[3]();
        cardFlipActions[4]();
        cardFlipActions[5]();
        cardFlipActions[6]();
        cardFlipActions[7]();
        cardFlipActions[8]();
        cardFlipActions[9]();
        cardFlipActions[10]();
        cardFlipActions[11]();
        cardFlipActions[12]();
        cardFlipActions[13]();
        cardFlipActions[14]();
        cardFlipActions[15]();
    }
    
    function handleCardReveal() {
        console.log('handleReveal()');
        dispatch(setCardFlip0(true));
        dispatch(setCardFlip1(true));
        dispatch(setCardFlip2(true));
        dispatch(setCardFlip3(true));
        dispatch(setCardFlip4(true));
        dispatch(setCardFlip5(true));
        dispatch(setCardFlip6(true));
        dispatch(setCardFlip7(true));
        dispatch(setCardFlip8(true));
        dispatch(setCardFlip9(true));
        dispatch(setCardFlip10(true));
        dispatch(setCardFlip11(true));
        dispatch(setCardFlip12(true));
        dispatch(setCardFlip13(true));
        dispatch(setCardFlip14(true));
        dispatch(setCardFlip15(true));
    }

    useEffect(() => {
        console.log('intializeGame: ',initializeGame);
        if (!initializeGame && cardShuffle) {
            console.log('SET TIME OUT RUN');
            setTimeout(() => {
                handleCardReveal();
              }, 1500);

              setTimeout(() => {
                handleConseal();
                dispatch(setInitializeGame(true));
              }, 4500);
        }
    }, [initializeGame, cardShuffle]);

    useEffect(() => {
        console.log('MATCH COMPARE: ', matchCompare);
        if (matchCompare.length === 2) {
            setTimeout(() => {
                handleMatchCompare();
              }, 600);
        }
    }, [matchCompare]);

    return (
        <>
        </>
    );
}

export default GameLogicController;
