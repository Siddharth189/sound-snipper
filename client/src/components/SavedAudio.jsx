import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

function SavedAudio(props) {
    return (
        <button className="flex bg-white/10 w-full py-4 px-4 hover:scale-105 transition duration-300">
            <IconContext.Provider value={{color: "#00bcd4", size: "3em"}}>
                <AiFillPlayCircle />
            </IconContext.Provider>
            <div className="flex flex-col ml-6">
                <span className="font-semibold text-2xl opacity-80"> {props.title} </span>
                <span className="font-semibold text-xl"> {props.time} </span>
            </div>
        </button>
    );
}

export default SavedAudio;