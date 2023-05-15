import axios from "axios";
import { useRef, useContext, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { IconContext } from "react-icons";
import AudioContext from "../contexts/AudioContext";
import LoginContext from "../contexts/LoginContext";
import Modal from "./Modal/Modal";


function UploadButtons() {
    const fileUploadElement = useRef();
    const loadingBar = useRef();

    const [progressBar, setProgressBar] = useState(false);
    const [progressText, setProgressText] = useState(null);

    const [modal, setModal] = useState(false);
    const [url, setUrl] = useState("");

    const { setAudio } = useContext(AudioContext);
    const { loginData } = useContext(LoginContext);

    async function handleUpload(e) {
        const file = fileUploadElement.current.files[0];
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('privacy', 2);
        formData.append('username', loginData.username);

        setProgressBar(true);
        setProgressText("Uploading File...");
        const config = {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                loadingBar.current.style.width = `${percentCompleted}%`;

                if (percentCompleted === 100) {
                    setProgressText("Converting to Audio...");
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post('http://localhost:5000/audiosend', formData, config)
        .then(res => res.data)
        .then(res => {
            setProgressBar(false);
            setProgressText(null);
            // TODO
        })
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
        <>
            <div className="flex justify-center gap-6">
                <button onClick={() => { fileUploadElement.current.click() }} className="bg-red-custom hover:bg-red-800 transition duration-200 rounded-lg py-1 pl-2 pr-3 font-semibold flex items-center gap-1">
                    <IconContext.Provider value={{ size: "2em" }}> <AiOutlineUpload /> </IconContext.Provider>
                    Upload Media File
                </button>
                <input type="file" onChange={handleUpload} ref={fileUploadElement} name="audioupload" id="audioupload" className="hidden" accept="video/mp4 video/3gp video/mov video/m4a video/ogg video/avi" />
                <input type="text" name="link" value={url} onChange={(e) => { setUrl(e.target.value) }} placeholder="Paste a link..." className=" rounded-xl bg-grey-custom px-2 placeholder:text-black/70 text-black/90 placeholder:italic w-72" />
                <button className="bg-red-custom hover:bg-red-800 transition duration-200 rounded-lg py-1 pl-2 pr-3 font-semibold"
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div>

            {
                progressBar && (
                    <div className="flex gap-4 mt-3 -mb-9 items-center">
                        <div className="h-2 w-96 rounded-full bg-white/20">
                            <div className="h-full w-0 bg-gradient-to-r from-gr-1 to-gr-2 rounded-full animate-gradient" ref={loadingBar}></div>
                        </div>
                        <span> { progressText } </span>
                    </div>
                )
            }
            
            {modal && <Modal />}
        </>
    );
}

export default UploadButtons;