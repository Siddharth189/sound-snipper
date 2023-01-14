def remove_ext(filename: str) -> str:
    try:
        i = filename.rindex(".")
        ext = filename[i:]
        return filename.removesuffix(ext)
    except ValueError:
        return filename

if __name__ == '__main__':
    i = remove_ext("file.mp4")
    print(i)