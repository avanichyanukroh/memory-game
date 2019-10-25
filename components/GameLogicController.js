import React, { useEffect, forwardRef, useImperativeHandle  } from 'react';
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
    setMatchCompare
} from '../redux/actions';

const GameLogicController = React.memo(forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const matchCompare = useSelector(store => store.matchCompare);

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

    useImperativeHandle(ref, (index, value) => ({
        addToMatchCompare(index, value) {
            dispatch(setMatchCompare([...matchCompare, {index: index, value: value}]))
        }
        
    }))
    
    function handleMatchCompare() {
        if (matchCompare[0].value === matchCompare[1].value) {
            dispatch(setMatchCompare([]));
        }
        else {
            cardFlipActions[matchCompare[0].index]();
            cardFlipActions[matchCompare[1].index]();
            dispatch(setMatchCompare([]));
        }
    }

    function handleConseal() {
        console.log('handleCardReveal()');
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
        console.log('handleConseal()');
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
            setTimeout(() => {
                handleCardReveal();
              }, 2000);

              setTimeout(() => {
                handleConseal();
              }, 5000);
    }, []);

    useEffect(() => {
        if (matchCompare.length === 2) {
            setTimeout(() => {
                console.log('now has 2');
                handleMatchCompare();
              }, 1000);
        }
        // return () => {
        //     cleanup
        // };
    }, [matchCompare]);

    return (
        <>
        </>
    );
}))

export default GameLogicController;
