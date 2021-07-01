export const elements = {
    root_container:document.querySelector(".root_container")
}

export const convertToTimecode = (d) => {
    if (d < 0) {
        d = d * -1;
    }
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    if (h < 10 && h > 0) h = "0" + h + ":";
    else h = "";
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return h + m + ":" + s;
}
