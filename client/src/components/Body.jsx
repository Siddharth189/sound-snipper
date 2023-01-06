import SavedAudio from "./SavedAudio";

function Body() {
    return (
        <div className="w-screen mt-24 pt-10 md:flex">
            <div className="flex-grow-[10] flex flex-col items-center">
                <div className="">
                    
                </div>
            </div>
            <div className="flex-grow-[3] rounded-3xl bg-dark-accent flex flex-col items-center pb-6">
                <span className="text-3xl font-bold mt-4 mb-12"> SAVED AUDIOS </span>
                <SavedAudio title={"Audio Title"} time={"03:45"} />
            </div>
        </div>
    );
}

export default Body;