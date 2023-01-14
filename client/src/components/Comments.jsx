import convert from "../utils/timeConvert";
import CommentsContext from "../contexts/CommentsContext";
import { useContext } from "react";

function Comments() {
    const { comments } = useContext(CommentsContext);

    return (
        <>
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
        </>
    );
}

export default Comments;