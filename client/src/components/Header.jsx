import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";
import { AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons";

function Header() {
    const { loginData } = useContext(LoginContext);

    return (
        <div className="bg-dark-accent w-screen h-20 rounded-b-2xl fixed top-0 flex justify-between">
            <div className="flex px-6 py-2 gap-8">
                <img src="/logo.png" alt="logo" className="h-[60%] md:h-full w-auto my-auto" />
                <span className="my-auto font-bold text-lg md:text-3xl">
                    SOUND SNIPPER
                </span>
            </div>
            <div className="flex gap-4 pr-4 items-center">
                <button className={`bg-blue-700 hover:bg-blue-d transition duration-200 h-min py-1 px-5 rounded-xl text-lg font-semibold whitespace-nowrap ${loginData.loggedin && "hidden md:block"}`}
                >
                    LOG IN
                </button>

                { loginData.loggedin && (
                    <div className="flex items-center text-lg opacity-70 cursor-pointer font-semibold hover:opacity-100 transition duration-200 group">
                        <IconContext.Provider value={{size: "2em"}}> <AiOutlineUser /> </IconContext.Provider>
                        <span className="hidden md:block"> {loginData.username} </span>
                        <div className="hidden group-focus:block md:group-hover:block fixed top-0 right-4 pt-20">
                            <div className="rounded-xl border-white/40 bg-dark-bg border-[1px] my-4 px-4 py-1">
                                <div className="md:hidden text-center text-xl mb-2">
                                    {loginData.username}
                                </div>
                                <ul>
                                    <li className="whitespace-nowrap opacity-70 hover:opacity-100 transition duration-200"> Account Settings </li>
                                    <hr className="opacity-40 my-1" />
                                    <li className="whitespace-nowrap opacity-70 hover:opacity-100 transition duration-200"> Log Out </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
        </div>
    );
}

export default Header;