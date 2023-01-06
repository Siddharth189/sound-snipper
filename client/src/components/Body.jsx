import SavedAudio from "./SavedAudio";
import { AiOutlineUpload } from "react-icons/ai";
import { IconContext } from "react-icons";
import Player from "./Player";


function Body() {
    return (
        <div className="w-screen mt-24 pt-10 md:flex">
            <div className="flex-grow-[10] flex flex-col items-center">
                <div className="flex justify-center gap-6">
                    <button className="bg-red-custom hover:bg-red-800 transition duration-200 rounded-lg py-1 pl-2 pr-3 font-semibold flex items-center gap-1">
                        <IconContext.Provider value={{size: "2em"}}> <AiOutlineUpload /> </IconContext.Provider>
                        Upload Media File
                    </button>
                    <input type="text" name="link" placeholder="Paste a link..." className=" rounded-xl bg-grey-custom px-2 placeholder:text-black/70 text-black/90 placeholder:italic w-72"/>
                </div>
                <Player />
            </div>
            <div className="flex-grow-[3] rounded-3xl bg-dark-accent mt-6 md:mt-0 flex flex-col items-center pb-6">
                <span className="text-3xl font-bold mt-4 mb-12"> SAVED AUDIOS </span>
                <SavedAudio title={"Audio Title"} time={"03:45"} />
            </div>
        </div>
    );
}

export default Body;