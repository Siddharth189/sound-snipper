import pafy
import os

v = pafy.new("https://www.youtube.com/watch?v=2Vv-BfVoq4g")
stream = v.getbestaudio()
name = v.title
audio_length = v.length
path = os.path.join("../build/", f"{name}.ogg")
stream.download(path)