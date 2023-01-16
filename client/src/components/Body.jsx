import SavedAudiosContainer from "./SavedAudios/SavedAudiosContainer";
import AudioPlayer from "./Player/AudioPlayer";
import Comments from "./Comments";
import UploadButtons from "./UploadButtons";


function Body() {
    return (
        <div className="w-screen mt-20 pt-10 md:flex">
            <div className="flex-grow-[10] flex flex-col items-center">
                <UploadButtons />
                <div className="flex justify-around w-full">
                    <div className="flex-grow flex flex-col items-center -mx-44">
                        <AudioPlayer />
                    </div>
                    <Comments />
                </div>
                
            </div>
            <SavedAudiosContainer />
        </div>
    );
}

export default Body;