function convert(sec) {
    let m = sec/60;
    m = Math.floor(m);
    let s = sec % 60
    s = Math.floor(s);
    if (s <= 9) {
        s = `0${s}`;
    }

    return `${m}:${s}`;
}

export default convert;