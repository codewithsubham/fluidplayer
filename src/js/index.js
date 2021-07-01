import Hls  from "hls.js";
import Live from "./model/live";
import Vod from "./model/vod";

let video = document.getElementById("video");
let hls;
let watchLiveDuration = 0;
let videoIsLive = false;
let isPlayerInitialised = false;



/*
ffmpeg -re -i sample.mp4 -codec copy -f flv "rtmp://172.104.207.27:9090/43cd8f35/myStream flashver=FMLE/3.0\20(compatible;\20FMSc/1.0) pubUser=visionias pubPasswd=vision123"

ffmpeg -re -i sample.mp4 -codec copy -f flv rtmp://visionias:vision123@172.104.207.27:9090/43cd8f35/myStream
*/

if (Hls.isSupported()) {
    hls = new Hls();
    let x = "http://localhost:1935/test/mp4:sample.mp4/playlist.m3u8";
    hls.loadSource("http://172.104.207.27:9090/43cd8f35/myStream/playlist.m3u8?DVR");
    hls.attachMedia(video);
    
   // console.log(hls)
}

hls.on(Hls.Events.LEVEL_UPDATED, (d ,data) => {
    //console.log(data.details.live);
    watchLiveDuration =  Math.round(data.details.totalduration) 
    videoIsLive = data.details.live;
    initVideoPlayer(videoIsLive);

    if(videoIsLive){
        // update time whenever video duration is  changed
        
        window.liveplayer.updateLiveTotalDuration(parseInt(watchLiveDuration));

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
        window.liveplayer = new Live();
        return;
    }
    
    console.log(new Vod())
    //call vod player
    return;

}


video.ontimeupdate =  () => {
  //  console.log(watchLiveDuration , "difference ");
    console.log(video.currentTime);

    window.liveplayer.updateCurrentTime(parseInt(video.currentTime));

    if(watchLiveDuration - Math.round(video.currentTime) > 25){
        console.log("not live")
        return
    }

 //   console.log("live");

}
