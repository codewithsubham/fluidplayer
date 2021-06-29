const conf = {
    container: "playerContainer",
    get link() {
        const isIOS =
            (navigator.platform === "MacIntel" &&
                navigator.maxTouchPoints > 0) ||
            navigator.platform === "iPad";
        return {
            hls:
                "http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8",
            //dash:
            //  "http://104.199.144.5:1935/vod/smil:4380201902171700.smil/manifest.mpd",
        };
        /*
        if(!isIOS){
             return {
                //hls:"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" 
                hls:"http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8"
                // hls:"http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8"
             }
        }else{
            return{
                  //  mp4:"../test.mp4"
                  
                //dash:"https://visionias.akamaized.net/video/smil:450420190812180000.smil/manifest.mpd?hdnts=exp%3D1602854101%7Eacl%3D%2F%2A%7Ehmac%3D247e0f754f6489f07476f40ab6dd10c9bb3ff7ed99b4aac692b48bcee9685e9f"
                //dash:"https://visionias.akamaized.net/video/smil:450420190812180000.smil/playlist.m3u8?hdnts=exp=1601490384~acl=/*~hmac=4de6c3ef5e0db4f130496a58e2ad42b90d3dcf5be381edf03c844459aa642518"
               // dash:"https://visionias.akamaized.net/video/smil:450420190812180000.smil/manifest.mpd?hdnts=exp=1601490384~acl=/*~hmac=ee21fc2b1a2e8e1fb764959b2088e1088d478b7e577531c11d2c496f1ffbf7f2"
                    //dash:"https://visionias.akamaized.net/video/smil:4496201909031730.smil/manifest.mpd?hdnts=exp%3D1610660235%7Eacl%3D%2F%2A%7Ehmac%3D519e157fd01a5f66d59bbdb144dc3541856ef30286984ce3a2e6b922b14e21e7",
                 //  dash:"http://104.199.144.5:1935/vod/smil.4471202007311000.smil/manifest.mpd"
                     dash:"http://104.199.144.5:1935/vod/smil:4471202007311000.smil/manifest.mpd"
                   
                    // dash:'http://localhost:1935/pro/smil:test.smil/manifest.mpd'
                   // hls:"http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8"
              
              //dash:"https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd" 
                    // dash:"http://visionitlabs.com/vplayer3/player.php?id=4380201902171700"
                    // dash:"https://cors-anywhere.herokuapp.com/http://visionitlabs.com/vplayer3/js/smil:test.smil/manifest.mpd?DVR"

               //hls:"http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8"

               //
             
            }
        }
        */
    },

    // hls:'https://visionias.akamaized.net/vision-vod/smil:test.smil/playlist.m3u8?hdnts=<?php print $token; ?>',
    // hls:"https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    // using hls: "http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8",
    // hls: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
    // dash:"https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
    // dash: "http://192.169.10.5:1935/vod/smil:42151608201701.smil/manifest.mpd",
    // mp4: ["http://localhost/player/720p.mp4", "http://localhost/player/stock.mp4"],
    // mp4: "http://192.169.10.5/player/720p.mp4",
    // webm: "http://localhost/player/stock.webm",
    // poster: "http://localhost/player/poster.jpg",
    controls: {
        play: "true",
        seekBack: "true",
        seekFwd: "true",
        seekInterval: 15,
        sticky: "true",
        autoHide: "true",
        quality: "true",
        bookmark: false,
    },
    overlay: {
        show: false,
        overlayText: "ksdwivedi@visionias.in",
        displayDuration: 40, // maximum time to be displayed
        displayTimeout: 10 * 2, // maximum time after when is should be displayed again
        minDisplayDuration: 200, // minimum time to be displayed
        minDisplayTimeout: 1000 * 1, // min time after when is should be displayed again
        avoidVerticalArea: 20, // % to avoid vertical screen range to kept in between 1 to 100;
    },
    overlayPhoneNumber: {
        show: false,
        positionX: "left",
        positionY: "bottom",
        posX: 0,
        posY: 0,
        mobileNumber: 9205546173,
    },
    refValidate: {
        image:
            "http://192.169.10.5:1935/vod/smil:42151608201701.smil/image.gif",
        timeout: 300,
    },
    bookmark: {
        storage: "db",
        configFile: "bookmark/config.php",
    },
};
