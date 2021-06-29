<?php
$user_agent = $_SERVER["HTTP_USER_AGENT"];
$video_url="http://104.199.144.5/bplayer/video.php?id=". $_GET["id"];
$poster_url="./poster.jpg";
$referer = True;//$_SERVER["HTTP_REFERER"];

if(!preg_match("/visionias/i", $referer) || preg_match("/kecua/i", $referer))
{
	//If iPad
	if (preg_match("/iPad/i", $user_agent) || preg_match("/iPhone/i", $user_agent))
	{
		$video_source="hls: \"http://104.199.144.5:1935/vod/smil:". $_GET["id"].".smil/playlist.m3u8\"";
		
	}
	else
	{
		$video_source="dash: \"".$video_url."\"";
	}
}
else
{
		print "This page must be accessed within an iFrame.";
		exit();
}

?>
<html lang="en">
<head>
	<title>Online Class: Vision IAS</title>
	<meta charset="UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="http://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" type="text/css"/>
	<!-- bitdash player -->
	<script type="text/javascript" src="./bitmovinplayer.js"></script>

	<style>
    figure {
      margin: 0;
      padding: 0;
    }
    .container {
      font-family: "Dosis";
      color:       white;
      text-align:  center;
    }
    .container a {
      color: white;
    }
    .container h1 {
      font:          54px/66px "Dosis";
      margin-bottom: 22px;
      line-height:   66px;
    }
    .container h2 {
      font-weight:   normal;
      margin-bottom: 36px;
      line-height:   26px;
    }
    .player-wrapper {
      width:        100%;
      margin-right: auto;
      margin-left:  auto;
	<!--      box-shadow:   0 0 30px rgba(0,0,0,0.7); -->
    }
    #webserver-warning {
      margin:           50px;
      padding:          20px;
      background-color: rgba(255,0,0,0.5);
      display:          none;
    }
	</style>
</head>
<body style="margin:0;padding:0">
<div class="container">
  <div class="content">
    <div class="player-wrapper">
      <div id="player"></div>
    </div>
    </div>
  </div>
</div>
<script type="text/javascript">
var conf = {
	key:       "fd772e0e-c07d-499f-9f7a-93e21fe645d7", 
	<!-- key: "e4580e68-20d4-4ba4-86a0-afcbe36ef7bf", -->
	playback: {
    autoplay                : true,
    muted                   : false
    },
    source: {
		<?php print $video_source; ?>,
		poster:      "<?php print $poster_url; ?>" 
    },
	labeling: {
		dash: {
			qualities: function(quality) {
            return quality.height + 'p';
			}
		}
	},
	style: {
		playOverlay: false
	},
	tweaks : {
		autoqualityswitching : true,
		max_buffer_level     : 600,
		search_real_end      : false,
	}
};

var player = bitmovin.player("player");

player.setup(conf).then(function(value) {
// Success
	console.log("Successfully created player instance");
	}, function(reason) {
    // Error!
    console.log("Error while creating player instance");
});
</script>
</body>
</html>
