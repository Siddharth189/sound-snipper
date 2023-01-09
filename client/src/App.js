import './assets/App.css';
import Header from './components/Header';
import Body from './components/Body';
import LoginContext from './contexts/LoginContext';
import AudioContext from './contexts/AudioContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [loginData, setLoginData] = useState({
        loggedin: false,
        username: ""
    });

    useEffect(() => {
        axios.post("http://localhost:5000/signin", {
            "username": "audiophile123",
            "password": "password"
        })
        .then(res => {
            console.log(res);
            return res.data
        })
        .then((res) => {
            setLoginData({
                loggedin: true,
                username: "audiophile123"
            })
        })
    }, [])

    const [audio, setAudio] = useState(null);

    return (
        <LoginContext.Provider value={{loginData, setLoginData}}>
        <AudioContext.Provider value={{audio, setAudio}}>
            <Header />
            <Body />
        </AudioContext.Provider>
        </LoginContext.Provider>
    );
}

export default App;
