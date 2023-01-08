import { AiOutlineShareAlt, AiOutlineDownload } from "react-icons/ai";
import { IoPlayForward, IoPlayBack } from "react-icons/io5";
import { IconContext } from "react-icons";
import Audio from "./Audio";

function Player() {
    return (
        <div className="w-[80%] mt-16 flex flex-col items-center">
            <div className="flex w-full justify-around">
                <div className="flex items-center gap-2 opacity-80">
                    <IconContext.Provider value={{ size: "2em" }}>
                        {" "}
                        <AiOutlineShareAlt />{" "}
                    </IconContext.Provider>
                    <span className="opacity-70 font-semibold">
                        {" "}
                        Share Audio via Link{" "}
                    </span>
                </div>
                <div className="flex items-center gap-2 opacity-80">
                    <IconContext.Provider value={{ size: "2em" }}>
                        {" "}
                        <AiOutlineDownload />{" "}
                    </IconContext.Provider>
                </div>
            </div>
            <div className="flex w-full justify-center">
                
                <button className=" rounded-lg py-1 pl-2 pr-10 font-semibold flex items-center ">
                <IconContext.Provider value={{ size: "3em" }}>
                        {" "}
                        <IoPlayBack />{" "}
                    </IconContext.Provider>
                </button>
                <Audio
                    url={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
                />
                <button className=" rounded-lg py-1 pl-10 pr-3 font-semibold flex items-center ">
                <IconContext.Provider value={{ size: "3em" }}>
                        {" "}
                        <IoPlayForward />{" "}
                    </IconContext.Provider>
                </button>

            </div>
        </div>
    );
}

export default Player;
