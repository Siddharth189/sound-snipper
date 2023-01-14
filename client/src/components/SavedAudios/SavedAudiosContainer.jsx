import SavedAudio from "./SavedAudio";

function SavedAudiosContainer() {
    return (
            <div className="flex-grow-[3] rounded-3xl bg-dark-accent/20 mt-6 md:mt-0 flex flex-col items-center pb-6">
                <span className="text-3xl font-bold mt-4 mb-12"> SAVED AUDIOS </span>
                <SavedAudio title={"Ed Sheeran - Perfect"} time={"04:40"} />
                <SavedAudio title={"Shallow - Lady Gaga..."} time={"03:37"} />
            </div>
    );
}

export default SavedAudiosContainer;