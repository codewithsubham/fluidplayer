import Hls from "hls.js";
import { getIcons, setThemeOnStart } from "./model/domelements";
import Live from "./model/live";
import Vod from "./model/vod";

let video = document.getElementById("video");
window.hls;
window.watchLiveDuration = 0;
let videoIsLive = false;
let isPlayerInitialised = false;

window.timeTollerance = 30;



window.onload = () =>
{

    if (!Hls.isSupported()) return document.getElementById("root_container").innerHTML = `<video id="video" controls width='100%' height='100%' autoplay poster="http://live.visionias.in:8080/logo/Vision.png" src="${config.url}"></video>`;

    window.hls = new Hls(config.conf);
    let y = "http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8";
    let x = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";//"http://localhost:1935/test/mp4:sample.mp4/playlist.m3u8";
    // config.url = x;
    window.hls.loadSource(config.url);
    window.hls.attachMedia(video);



    window.hls.on(Hls.Events.LEVEL_UPDATED, (d, data) =>
    {
        window.watchLiveDuration = parseInt(data.details.totalduration)
        videoIsLive = data.details.live;
        initVideoPlayer(videoIsLive);
        if (videoIsLive)
        {
            // update time whenever video duration is  changed
            window.player.updateLiveTotalDuration(parseInt(window.watchLiveDuration));

        }


        // update the seekbar and totalVideo diuratio  if video is live;


    })


    window.hls.on(Hls.Events.ERROR, (e, data) =>
    {
        if (videoIsLive) return;
        if (!data.fatal) return;
        window.player.showError(data.type);
    });

    window.hls.on(Hls.Events.LEVEL_SWITCHED, () =>
    {
        //if (videoIsLive) video.currentTime = hls.liveSyncPosition;
    });




    let initVideoPlayer = (isLIVE) =>
    {
        /** 
         * initVideoPlayer will initialize video player according to the type of video
         * a boolean value isVideoLive  = true || false
        */

        // check player is created or not , if created then return
        if (isPlayerInitialised) return;

        // construct player for once
        isPlayerInitialised = true;


        if (isLIVE)
        {
            // call live player
            window.player = new Live(true);
            video.muted = true;
            video.play();
            setThemeOnStart();
            //hls.loadLevel = hls.levels.length - 1;


        } else
        {
            window.player = new Vod(false);
            window.hls.on(Hls.Events.FRAG_BUFFERED, window.player.onFragmentLoad);

        }

        window.hls.once(Hls.Events.MANIFEST_PARSED, window.player.setQualityList(hls.levels));
        setThemeOnStart();
        //call vod player
        return;

    }


    video.ontimeupdate = () =>
    {



        if (videoIsLive)
        {

            if (parseInt(window.watchLiveDuration - video.currentTime) < window.timeTollerance)
            {
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
        } else
        {
            window.player.updateCurrentTime(parseInt(video.currentTime));
            localStorage.setItem(`currentTime-${config.videoid}`, video.currentTime);


        }


    }

    video.onplay = function ()
    {
        document.getElementById("playPause").innerHTML = getIcons("icon-pause");
        localStorage.removeItem(`currentTime-${config.videoid}`);
    }
    video.onpause = function ()
    {
        document.getElementById("playPause").innerHTML = getIcons("icon-play");
    }


    video.onwaiting = (event) =>
    {
        window.player.drawLoader();

    };
    video.oncanplaythrough = (event) =>
    {
        window.player.removeLoader();
    };
    video.onplaying = (event) =>
    {
        window.player.removeLoader();
    };




}