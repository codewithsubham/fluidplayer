<?php

$id = isset($_GET['id']) ? $_GET['id'] : "0034a16d";

?>

<html>

<head>
    <title>Fluidplayer</title>
    <link rel="stylesheet" href="css/style.css">

    <link rel="stylesheet" href="css/mobile.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>

<body>

    <!--
                A basic player structure which is needed for both live and vod playback
                
                1.  videoplayer 
                2.  play/Pause  
                3.  fullscreen 
                4.  setting
                5.  seek forward and backward
                6.  volume
                7.  quality selector
                8.  speed selector
                9.  seekbar , bufferbar
                10. toobar
                11. dark theme button


            -->



    <div id="root_container" class="root_container" style="width: 100%;height:100%;">
        <video id="video" autoplay poster="/img/poster.jpg"></video>
       
    </div>

    <script>
        

        let config = {
            seekValue: 10,
            playBackSpeedList: [0.25, .5, 1, 2],
            videoid: "<?php echo $id ?>",
            isMobile: undefined,
            conf: {
                liveBackBufferLength: 600,
                /*
                xhrSetup: function (xhr, url) {
                    xhr.withCredentials = true;
                },
                */
            },

         
            url: `http://172.104.207.27:9090/<?php echo $id ?>/smil:myStream.smil/playlist.m3u8?DVR`,
            errorCode: "Opps Something went wrong pleae reload video"

        }

    </script>
    <script type="text/javascript" src="js/index.js"></script>
</body>

</html>