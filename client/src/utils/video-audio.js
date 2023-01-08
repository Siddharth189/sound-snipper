import VideoToAudio from 'video-to-audio'

async function convertToAudio(input) {
    let sourceVideoFile = input.files[0];
    let targetAudioFormat = 'mp3'
    let convertedAudioDataObj = await VideoToAudio.convert(sourceVideoFile, targetAudioFormat);
}

// function downloadAudio(convertedAudioDataObj) {
//     let a = document.createElement("a");
//     a.href = convertedAudioDataObj.data;
//     a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
//     a.click();
// }