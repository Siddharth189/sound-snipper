import SavedAudio from "./SavedAudio";
import { AiOutlineUpload } from "react-icons/ai";
import { IconContext } from "react-icons";
import AudioPlayer from "../AudioPlayer";
import tracks from "../tracks";
import Player from "./Player";
import { useRef, useContext, useState, useEffect } from "react";
import AudioContext from "../contexts/AudioContext";
import convert from "../utils/timeConvert";
import axios from "axios";
import LoginContext from "../contexts/LoginContext";
import Modal from "./Modal";


function Body() {
    const fileUploadElement = useRef();

    const {setAudio} = useContext(AudioContext);
    const {loginData} = useContext(LoginContext);
    const [comments, setComments] = useState([]);

    const [modal, setModal] = useState(false);

    const [url, setUrl] = useState("");

    async function handleUpload(e) {
        const file = fileUploadElement.current.files[0];
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('privacy', 2);
        formData.append('username', loginData.username);
        axios.post('http://localhost:5000/audiosend', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    }

    async function handleSubmit(e) {
        axios.post("http://localhost:5000/audiosend", {
            privacy: 2,
            username: loginData.username,
            url: url
        })
        .then(res => res.data)
        .then((res) => {
            setAudio(res.name);
            setModal(false);
        })
        setModal(true);

    }

    return (
        <div className="w-screen mt-24 pt-10 md:flex">
            <div className="flex-grow-[10] flex flex-col items-center">
                <div className="flex justify-center gap-6">
                    <button onClick={() => {fileUploadElement.current.click()}} className="bg-red-custom hover:bg-red-800 transition duration-200 rounded-lg py-1 pl-2 pr-3 font-semibold flex items-center gap-1">
                        <IconContext.Provider value={{size: "2em"}}> <AiOutlineUpload /> </IconContext.Provider>
                        Upload Media File
                    </button>
                    <input type="file" onChange={handleUpload} ref={fileUploadElement} name="audioupload" id="audioupload" className="hidden" accept="video/mp4 video/mkv" />
                    <input type="text" name="link" value={url} onChange={(e) => {setUrl(e.target.value)}} placeholder="Paste a link..." className=" rounded-xl bg-grey-custom px-2 placeholder:text-black/70 text-black/90 placeholder:italic w-72"/>
                    <button className="bg-red-custom hover:bg-red-800 transition duration-200 rounded-lg py-1 pl-2 pr-3 font-semibold"
                    onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                <div className="flex justify-around w-full">
                    <div className="flex-grow flex flex-col items-center -mx-44">
                        <Player />
                        <AudioPlayer tracks={tracks} setComments={setComments} />
                    </div>
                    {
                        comments.length > 0 && (
                            <div className="h-full pt-16 w-[30%] mr-16">
                                <div className="rounded-2xl flex flex-col bg-white/10 h-full w-full drop-shadow-2xl">
                                    <span className="py-2 text-lg font-semibold text-center"> COMMENTS </span>
                                    {
                                        comments.map((v, i) => (
                                            <div className="w-full bg-black/20 px-4 py-4 flex items-center">
                                                <span className="mr-4"> {convert(v.timestamp)} </span>
                                                <span className=""> {v.comment} </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                
            </div>
            <div className="flex-grow-[3] rounded-3xl bg-dark-accent/20 mt-6 md:mt-0 flex flex-col items-center pb-6">
                <span className="text-3xl font-bold mt-4 mb-12"> SAVED AUDIOS </span>
                <SavedAudio title={"Ed Sheeran - Perfect"} time={"04:40"} />
                <SavedAudio title={"Shallow - Lady Gaga..."} time={"03:37"} />
            </div>

            {modal && <Modal />}
        </div>
    );
}

export default Body;