import moviepy.editor as mp
import os
from io import BytesIO
from subprocess import Popen, PIPE


def convert(video_path, audio_path):
    my_clip = mp.VideoFileClip(video_path)
    my_clip.audio.write_audiofile(audio_path)


if __name__ == '__main__':
    file = open(r"../temp/ff.mp4", 'rb')
    buf = BytesIO(file.read())

    output = open(r"output.mp3", "wb")

    p = Popen(['ffmpeg', '-i', 'pipe:', '-map', '0:a', '-acodec', 'libmp3lame',
              '-f', 'mp3', 'pipe:'], stdout=output, stderr=PIPE, stdin=buf)

    # p.stdin.write()
    # output = p.stdout.read()
    # print(output)

    file.close()
    output.close()
