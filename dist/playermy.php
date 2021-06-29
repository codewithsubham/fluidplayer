<?php
require_once("./akamai_token_v2.php");
$conf = new Akamai_EdgeAuth_Config();
$t = new Akamai_EdgeAuth_Generate();

$conf->set_field_delimiter("~");
$conf->set_key("d4121cb37d1edfbfeb76212064193925");
$conf->set_algo("sha256");
$conf->set_window(5*3600); 	//Seconds
$conf->set_acl("/*");		// /* <- for all
$token = $t->generate_token($conf);
$token2 = urlencode($token);

echo $token2;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Vision IAS Online Class</title>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
    <!-- Bitmovin Player -->
    <script type="text/javascript" src="./bitmovinplayer.prod.js"></script>
</head>
<body>
	<!-- <img src="https://live.visionias.in:1936/vod/smil:112233445577.smil/image.gif"> -->

	<div id="my-player"></div>
<script type="text/javascript">

const config = {
	key: 'e4580e68-20d4-4ba4-86a0-afcbe36ef7bf',
	analytics:
	{
		key: 'e74b994d-2c8c-4627-a4a1-165d2bbe27b7',
		videoId: '<?php echo $_GET["id"]; ?>',
		title: '<?php echo $_GET["id"]; ?>'
	},
	style:
	{
		playOverlay: false
	},
	tweaks:
	{
		autoqualityswitching : true,
		max_buffer_level     : 600,
		search_real_end      : false,
	}
};

var container = document.getElementById('my-player');
var player = new bitmovin.player.Player(container, config);

var source = {
	hls: "https://visionias.akamaized.net/vision-vod/smil:test.smil/playlist.m3u8?hdnts=<?php print $token; ?>",
	options:
	{
		withCredentials : true,
		hlsManifestWithCredentials: true,
		manifestWithCredentials: true
	}
};

player.load(source).then(
  function(player) {
    console.log('Successfully created Bitmovin Player instance');
  },
  function(reason) {
    console.log('Error while creating Bitmovin Player instance');
  }
);

</script>
<style>
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        color: #fff;
    }
    body {
        background: rgba(44, 131, 185, 1);
        background: linear-gradient(to right, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#2c83b9', endColorstr='#1eabe3', GradientType=1);
    }
    #banner {
        border-bottom: 1px solid #fff;
        background-color: #1eabe3;
        width: 100%
    }
    #banner h1 {
        margin: 0;
        padding: 30px;
    }
    #banner .logo {
        padding: 10px;
        width: 25%;
        min-width: 350px;
        float: left;
        margin: auto;
    }
    #banner .title {
        width: 75%;
        white-space: nowrap;
    }
    h1.bitmovin-headline, h2.bitmovin-headline, h3.bitmovin-headline, p {
        font-weight: 300;
        text-align: center;
        margin: 40px;
    }
    .bitmovin-description {
        padding: 45px 0;
        font-size: large;
    }
    #player {
        box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
    }
    a {
        color: #97d9ef;
        font-weight: 400;
        text-decoration: none;
    }
    a:hover {
        color: #fff;
    }
    #webserver-warning {
        text-align: center;
        margin: 50px;
        padding: 20px;
        background-color: rgba(255, 0, 0, 0.5);
        display: none;
    }
    @media (max-width: 1000px) {
        .logo {
            width: 100%;
        }

        .title {
            display: b;
        }
    }
	.bmpui-ui-watermark {
		display: none;
	}
</style>
</body>
</html>
