import './assets/App.css';
import Header from './components/Header';
import Body from './components/Body';
import LoginContext from './contexts/LoginContext';
import AudioContext from './contexts/AudioContext';
import CommentsContext from './contexts/CommentsContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [loginData, setLoginData] = useState({
        loggedin: false,
        username: ""
    });
    const [audio, setAudio] = useState(null);
    const [comments, setComments] = useState([]);


    useEffect(() => {
        axios.post("http://localhost:5000/signin", {
            "username": "audiophile123",
            "password": "password"
        })
        .then(res => res.data)
        .then((res) => {
            setLoginData({
                loggedin: true,
                username: "audiophile123"
            })
        })
    }, [])

    return (
        <LoginContext.Provider value={{loginData, setLoginData}}>
        <AudioContext.Provider value={{audio, setAudio}}>
        <CommentsContext.Provider value={{comments, setComments}}>
            <Header />
            <Body />
        </CommentsContext.Provider>
        </AudioContext.Provider>
        </LoginContext.Provider>
    );
}

export default App;
