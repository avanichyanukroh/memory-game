import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { StatusBar } from 'react-native';
import store from './redux/store';
import MainMenu from './views/MainMenu';
import GameSession from './views/GameSession';
import Settings from './views/Settings';

function App() {
    return (
        <Provider store={store}>
            <StatusBar hidden />
            <NativeRouter>
                <Route exact path="/" component={GameSession} />
                <Route path="/GameSession" component={GameSession} />
                <Route path="/Settings" component={Settings} />
            </NativeRouter>
        </Provider>
    );
}

export default App;