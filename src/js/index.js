import Hls  from "hls.js";
import { getIcons } from "./model/domelements";
import Live from "./model/live";
import Vod from "./model/vod";

let video = document.getElementById("video");
window.hls;
window.watchLiveDuration = 0;
let videoIsLive = false;
let isPlayerInitialised = false;

window.timeTollerance = 30;



/*
ffmpeg -re -i sample.mp4 -codec copy -f flv "rtmp://172.104.207.27:9090/43cd8f35/myStream flashver=FMLE/3.0\20(compatible;\20FMSc/1.0) pubUser=visionias pubPasswd=vision123"

ffmpeg -re -i sample.mp4 -codec copy -f flv rtmp://visionias:vision123@172.104.207.27:9090/43cd8f35/myStream
*/

if (Hls.isSupported()) {

    let conf = {
        enableWorker: true,
        liveBackBufferLength: 900,
        /*
        xhrSetup: function (xhr, url) {
            xhr.withCredentials = true;
        },
        */
        
    };

    window.hls = new Hls();
    let y = "http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8";
    let x = "http://localhost:1935/test/mp4:sample.mp4/playlist.m3u8";
    window.hls.loadSource("http://172.104.207.27:9090/98b39719/smil:myStream.smil/playlist.m3u8?DVR"/*"http://172.104.207.27:9090/9096d6db/myStream/playlist.m3u8?DVR"*/);
    window.hls.attachMedia(video);

   // console.log(hls)
}

window.hls.on(Hls.Events.LEVEL_UPDATED, (d ,data) => {
    //console.log(data.details.live);
    window.watchLiveDuration =  parseInt(data.details.totalduration) 
    videoIsLive = data.details.live;
    initVideoPlayer(videoIsLive);

    if(videoIsLive){
        // update time whenever video duration is  changed
         window.player.updateLiveTotalDuration(parseInt(window.watchLiveDuration));
     }

   
    // update the seekbar and totalVideo diuratio  if video is live;

    
})




let initVideoPlayer = (isLIVE) => {
    /** 
     * initVideoPlayer will initialize video player according to the type of video
     * a boolean value isVideoLive  = true || false
    */

    // check player is created or not , if created then return
    if(isPlayerInitialised) return;

    // construct player for once
    isPlayerInitialised = true;
    
   
    if(isLIVE){
        // call live player
        window.player = new Live();
    }else{
        window.player = new Vod();
        window.hls.on(Hls.Events.FRAG_BUFFERED, window.player.onFragmentLoad);
    }

    window.hls.once(Hls.Events.MANIFEST_PARSED , window.player.setQualityList(hls.levels));
    
    //call vod player
    return;

}


video.ontimeupdate =  () => {



    if(videoIsLive){
        
        if(parseInt(window.watchLiveDuration - video.currentTime) < window.timeTollerance){
            // if video current duration falls below videotolal duration then show  user video is live
            
            window.player.updateLiveCurrentTime(parseInt(window.watchLiveDuration)); 
            document.getElementById("liveStatus").disabled = true;
            document.getElementById("liveStatus").innerHTML = "LIVE";
            return;
        }
        document.getElementById("liveStatus").disabled = false;
        document.getElementById("liveStatus").innerHTML = "GO LIVE";
        window.player.updateLiveCurrentTime(parseInt(video.currentTime)); 
        return;
    }else{
        window.player.updateCurrentTime(parseInt(video.currentTime));
    } 
    
   
}

video.onplay = function() {
    document.getElementById("playPause").innerHTML = getIcons("icon-pause");
}
video.onpause = function() {
    document.getElementById("playPause").innerHTML = getIcons("icon-play");
}

