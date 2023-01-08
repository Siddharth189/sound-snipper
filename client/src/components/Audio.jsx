import React, { useState, useEffect } from "react";
import { AiFillPlayCircle } from 'react-icons/ai';
import { AiFillPauseCircle } from 'react-icons/ai';


const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div>
            <button onClick={toggle}>{playing ? <AiFillPauseCircle size={'3em'} /> : <AiFillPlayCircle size={'3em'} />}</button>
        </div>
    );
};

export default Player;