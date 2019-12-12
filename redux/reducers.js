import {
    SET_CARD_FLIP_0,
    SET_CARD_FLIP_1,
    SET_CARD_FLIP_2,
    SET_CARD_FLIP_3,
    SET_CARD_FLIP_4,
    SET_CARD_FLIP_5,
    SET_CARD_FLIP_6,
    SET_CARD_FLIP_7,
    SET_CARD_FLIP_8,
    SET_CARD_FLIP_9,
    SET_CARD_FLIP_10,
    SET_CARD_FLIP_11,
    SET_CARD_FLIP_12,
    SET_CARD_FLIP_13,
    SET_CARD_FLIP_14,
    SET_CARD_FLIP_15,
    SET_INITIALIZE_GAME,
    SET_CARD_SHUFFLE,
    SET_MATCH_COMPARE,
    INCR_TURN_COUNT,
    INCR_MATCH_COUNT,
    INCR_TIMER,
    RESTART_GAME_SESSION,
    SET_CARD_THEME,
    SET_USER,
    SET_LEADER_BOARD,
    SET_HIGH_SCORE,
    SET_LOADING,
    SET_ERROR,
    INCR_ROUND,
    SET_INITIALIZE_ROUND
} from './actions';

const initialState = {
    cardFlip0: false,
    cardFlip1: false,
    cardFlip2: false,
    cardFlip3: false,
    cardFlip4: false,
    cardFlip5: false,
    cardFlip6: false,
    cardFlip7: false,
    cardFlip8: false,
    cardFlip9: false,
    cardFlip10: false,
    cardFlip11: false,
    cardFlip12: false,
    cardFlip13: false,
    cardFlip14: false,
    cardFlip15: false,
    initializeGame: false,
    cardShuffle: false,
    matchCompare: [],
    turnCount: 0,
    timer: 0,
    matchCount: 0,
    cardTheme: 'Puppies',
    user: null,
    leaderBoard: null,
    highScore: null,
    loading: null,
    error: null,
    round: 1
}


export const reducers = (state = initialState, action) => {
    if (action.type === SET_CARD_FLIP_0) {
		return Object.assign({}, state, {
			cardFlip0: action.cardFlip0
        });
    }

	if (action.type === SET_CARD_FLIP_1) {
		return Object.assign({}, state, {
			cardFlip1: action.cardFlip1
        });
    }

    if (action.type === SET_CARD_FLIP_2) {
		return Object.assign({}, state, {
			cardFlip2: action.cardFlip2
        });
    }

    if (action.type === SET_CARD_FLIP_3) {
		return Object.assign({}, state, {
			cardFlip3: action.cardFlip3
        });
    }

    if (action.type === SET_CARD_FLIP_4) {
		return Object.assign({}, state, {
			cardFlip4: action.cardFlip4
        });
    }

    if (action.type === SET_CARD_FLIP_5) {
		return Object.assign({}, state, {
			cardFlip5: action.cardFlip5
        });
    }

    if (action.type === SET_CARD_FLIP_6) {
		return Object.assign({}, state, {
			cardFlip6: action.cardFlip6
        });
    }

    if (action.type === SET_CARD_FLIP_7) {
		return Object.assign({}, state, {
			cardFlip7: action.cardFlip7
        });
    }

    if (action.type === SET_CARD_FLIP_8) {
		return Object.assign({}, state, {
			cardFlip8: action.cardFlip8
        });
    }

    if (action.type === SET_CARD_FLIP_9) {
		return Object.assign({}, state, {
			cardFlip9: action.cardFlip9
        });
    }

    if (action.type === SET_CARD_FLIP_10) {
		return Object.assign({}, state, {
			cardFlip10: action.cardFlip10
        });
    }

    if (action.type === SET_CARD_FLIP_11) {
		return Object.assign({}, state, {
			cardFlip11: action.cardFlip11
        });
    }

    if (action.type === SET_CARD_FLIP_12) {
		return Object.assign({}, state, {
			cardFlip12: action.cardFlip12
        });
    }

    if (action.type === SET_CARD_FLIP_13) {
		return Object.assign({}, state, {
			cardFlip13: action.cardFlip13
        });
    }

    if (action.type === SET_CARD_FLIP_14) {
		return Object.assign({}, state, {
			cardFlip14: action.cardFlip14
        });
    }

    if (action.type === SET_CARD_FLIP_15) {
		return Object.assign({}, state, {
			cardFlip15: action.cardFlip15
        });
    }

    if (action.type === SET_INITIALIZE_GAME) {
		return Object.assign({}, state, {
			initializeGame: action.initializeGame
        });
    }

    if (action.type === SET_CARD_SHUFFLE) {
		return Object.assign({}, state, {
			cardShuffle: action.cardShuffle
        });
    }

    if (action.type === SET_MATCH_COMPARE) {
		return Object.assign({}, state, {
			matchCompare: action.value
        });
    }

    if (action.type === INCR_TURN_COUNT) {
		return Object.assign({}, state, {
			turnCount: state.turnCount + 1
        });
    }

    if (action.type === INCR_TIMER) {
		return Object.assign({}, state, {
			timer: state.timer + 1
        });
    }

    if (action.type === INCR_MATCH_COUNT) {
		return Object.assign({}, state, {
			matchCount: state.matchCount + 1
        });
    }

    if (action.type === RESTART_GAME_SESSION) {
		return Object.assign({}, state, {
            cardFlip0: false,
            cardFlip1: false,
            cardFlip2: false,
            cardFlip3: false,
            cardFlip4: false,
            cardFlip5: false,
            cardFlip6: false,
            cardFlip7: false,
            cardFlip8: false,
            cardFlip9: false,
            cardFlip10: false,
            cardFlip11: false,
            cardFlip12: false,
            cardFlip13: false,
            cardFlip14: false,
            cardFlip15: false,
            initializeGame: false,
            cardShuffle: false,
            matchCompare: [],
            turnCount: 0,
            matchCount: 0,
            timer: 0,
            round: 1
        });
    }

    if (action.type === SET_CARD_THEME) {
		return Object.assign({}, state, {
			cardTheme: action.cardTheme
        });
    }

    if (action.type === SET_USER) {
		return Object.assign({}, state, {
            user: action.user,
            loading: null,
            error: null
        });
    }

    if (action.type === SET_LEADER_BOARD) {
		return Object.assign({}, state, {
            leaderBoard: action.leaderBoard,
            loading: null,
            error: null
        });
    }

    if (action.type === SET_HIGH_SCORE) {
		return Object.assign({}, state, {
            highScore: action.highScore,
            loading: null,
            error: null
        });
    }

    if (action.type === SET_LOADING) {
		return Object.assign({}, state, {
            loading: action.component,
            error: null
        });
    }

    if (action.type === SET_ERROR) {
		return Object.assign({}, state, {
            error: action.component,
            loading: null
        });
    }

    if (action.type === INCR_ROUND) {
		return Object.assign({}, state, {
            round: state.round + 1
        });
    }

    if (action.type === SET_INITIALIZE_ROUND) {
		return Object.assign({}, state, {
            cardFlip0: false,
            cardFlip1: false,
            cardFlip2: false,
            cardFlip3: false,
            cardFlip4: false,
            cardFlip5: false,
            cardFlip6: false,
            cardFlip7: false,
            cardFlip8: false,
            cardFlip9: false,
            cardFlip10: false,
            cardFlip11: false,
            cardFlip12: false,
            cardFlip13: false,
            cardFlip14: false,
            cardFlip15: false,
            cardShuffle: false,
            matchCompare: [],
            matchCount: 0
        });
    }

	return state;
};