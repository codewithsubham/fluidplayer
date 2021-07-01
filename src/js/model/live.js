import Player from "./player";
import { elements ,  convertToTimecode } from "./domelements";

export default class Live extends Player{

    constructor(){
        super("call from live");
        
        elements.liveStatus.style.display = "block";
        elements.liveStatus.addEventListener("click" , () => {
            this.goLive();
        })

    }

    updateLiveTotalDuration(duration){
        // this function is being called from index.js inside hls.events.LEVEL_UPDATE if player is live

        document.getElementById("playbackProgress").max = duration;
        document.getElementById("myRange").max = duration;
        document.getElementById("totaltime").innerHTML = convertToTimecode(parseInt(duration));
        return;
    }

    updateLiveCurrentTime(currentTime){
        
        document.getElementById("playbackProgress").value = currentTime;
        document.getElementById("myRange").value = currentTime;
        document.getElementById("curenttime").innerHTML = convertToTimecode(parseInt(currentTime));
        return;
    }


    goLive(){
        video.currentTime = parseInt(window.watchLiveDuration) - 10;
        return;
    }


}