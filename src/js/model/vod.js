import Player from "./player";
import {convertToTimecode, setThemeOnStart } from "./domelements"

export default class Vod extends Player{

    constructor(isLive){

        super(isLive);
        this.initVodPlayer();
    }

    initVodPlayer(){
        video.onloadedmetadata = () => {
            //seekbar values
            document.getElementById("playbackProgress").max = video.duration;
            document.getElementById("myRange").max = video.duration;
            document.getElementById("bufferProgress").max = video.duration;

            setThemeOnStart();

            // currenttime and totalduration text
            document.getElementById("totaltime").innerHTML = convertToTimecode(parseInt(video.duration));
            
            if(localStorage.getItem(`currentTime-${config.videoid}`)){
                video.currentTime = parseInt(localStorage.getItem(`currentTime-${config.videoid}`));
            }

         }
        return;
    }

  

    
}