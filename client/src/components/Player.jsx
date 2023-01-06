import { AiOutlineShareAlt, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";

function Player() {
    return ( 
        <div className="w-[80%] mt-16 flex flex-col items-center">
            <div className="flex w-full justify-around">
                <div className="flex items-center gap-2 opacity-80">
                    <IconContext.Provider value={{size: "2em"}}> <AiOutlineShareAlt /> </IconContext.Provider>
                    <span className="opacity-70 font-semibold"> Share Audio via Link </span>
                </div>
                <div className="flex items-center gap-2 opacity-80">
                    <IconContext.Provider value={{size: "2em"}}> <AiOutlineDownload /> </IconContext.Provider>
                    <span className="opacity-70 font-semibold"> Save Audio </span>
                </div>
            </div>
        </div>
     );
}

export default Player;