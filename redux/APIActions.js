import axios from 'axios';
import { setUser, setLeaderBoard, setHighScore, setLoading, setError } from './actions';

export const loginUser = (username, pin) => dispatch => {
    dispatch(setLoading('login'));
    axios({
        method: 'post',
        url: 'https://flashback-api.herokuapp.com/api/user/login',
        data: {
            username: username,
            pin: pin
        }
    })
    .then(res => {
        dispatch(setUser(res.data));
    })
    .catch(err => {
        dispatch(setError('login'));
        console.log(err);
    });
}

export const registerUser = (username, pin) => dispatch => {
    dispatch(setLoading('signUp'));
    axios({
        method: 'post',
        url: 'https://flashback-api.herokuapp.com/api/user/',
        data: {
            username: username,
            pin: pin
        }
    })
    .then(res => {
        dispatch(setUser(res.data));
    })
    .catch(err => {
        console.log(err);
    });
}

export const getLeaderBoard = (mode) => dispatch => {
    dispatch(setLoading('leaderBoard'));
    axios({
        method: 'get',
        url: `https://flashback-api.herokuapp.com/api/score/${mode}`
    })
    .then(res => {
        dispatch(setLeaderBoard(res.data));
    })
    .catch(err => {
        console.log(err);
    });
}

export const getHighScore = (userId, mode) => dispatch => {
    axios({
        method: 'get',
        url: `https://flashback-api.herokuapp.com/api/score/highScore/${userId}/${mode}`
    })
    .then(res => {
        dispatch(setHighScore(res.data));
    })
    .catch(err => {
        console.log(err);
    });
}

export const updateHighScore = (userId, mode, result) => dispatch => {
    axios({
        method: 'post',
        url: `https://flashback-api.herokuapp.com/api/score/highScore/${userId}/${mode}`,
        data: {
            turn: result.turn,
            time: result.time,
            score: result.score
        }
    })
    .then(res => {
        dispatch(setHighScore(res.data));
    })
    .catch(err => {
        console.log(err);
    });
}