import React, { useState } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';


import MainMenu from './views/MainMenu';
import GameSession from './views/GameSession';
import Settings from './views/Settings';

function App() {
	Font.loadAsync({
		Bangers: require('./assets/fonts/Bangers-Regular.ttf'),
	});

    return (
        <>
            <StatusBar hidden />
            <NativeRouter>
                <Route exact path="/" component={GameSession} />
                <Route path="/GameSession" component={GameSession} />
                <Route path="/Settings" component={Settings} />
            </NativeRouter>
        </>
    );
}

export default App;