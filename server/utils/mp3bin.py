def mp3_to_bin(path):
    with open(path, 'rb') as f:
        return f.read()

def bin_to_mp3(path, bin):
    with open(path, 'wb') as f:
        f.write(bin)