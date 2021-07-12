import Player from "./player";
import { convertToTimecode, getIcons, setThemeOnStart } from "./domelements"

export default class Vod extends Player
{

    constructor(isLive)
    {

        super(isLive);
        this.initVodPlayer();
    }

    initVodPlayer()
    {
        video.onloadedmetadata = () =>
        {

            document.getElementById("playbackProgress").max = video.duration;
            document.getElementById("myRange").max = video.duration;
            document.getElementById("bufferProgress").max = video.duration;

            setThemeOnStart();

            // currenttime and totalduration text
            document.getElementById("totaltime").innerHTML = convertToTimecode(parseInt(video.duration));

            if (localStorage.getItem(`currentTime-${config.videoid}`))
            {
                video.currentTime = parseInt(localStorage.getItem(`currentTime-${config.videoid}`));
                return;
            }

            video.currentTime = 0

        }
        return;
    }

    showError(Err)
    {

        document.querySelector(".error_container").innerHTML = `<div class="errorStatus" id="errorStatus">${config.errorCode} ${Err} ${getIcons("icon-close")} </div>`

    }



}

