import Player from "./player";
import {convertToTimecode} from "./domelements"

export default class Vod extends Player{

    constructor(){

        super("call from vod");
        this.initVodPlayer();
    }

    initVodPlayer(){
        video.onloadedmetadata = () => {
            //seekbar values
            document.getElementById("playbackProgress").max = video.duration;
            document.getElementById("myRange").max = video.duration;
            document.getElementById("bufferProgress").max = video.duration;


            // currenttime and totalduration text
            document.getElementById("totaltime").innerHTML = convertToTimecode(parseInt(video.duration));
        }
        return;
    }

  

    
}