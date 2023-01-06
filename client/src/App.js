import './assets/App.css';
import Header from './components/Header';
import Body from './components/Body';
import LoginContext from './contexts/LoginContext';
import { useState } from 'react';

function App() {
    const [loginData, setLoginData] = useState({
        loggedin: true,
        username: "audiophile123"
    });

    return (
        <LoginContext.Provider value={{loginData, setLoginData}}>
            <Header />
            <Body />
        </LoginContext.Provider>
    );
}

export default App;
