
<?php


$user_agent = $_SERVER["HTTP_USER_AGENT"];
/*
include("akamai_token_v2.php");

$conf = new Akamai_EdgeAuth_Config();
$t = new Akamai_EdgeAuth_Generate();
$conf->set_field_delimiter("~");
$conf->set_key("d4121cb37d1edfbfeb76212064193925");
$conf->set_algo("sha256");
$conf->set_window(5*3600); //Seconds
$conf->set_acl("/*"); // /* <- for all
$token = $t->generate_token($conf);
$token_urlencode = urlencode($token);


//print_r($token_urlencode);
*/

include("akamai_token_v2.php");

$conf = new Akamai_EdgeAuth_Config();
$t = new Akamai_EdgeAuth_Generate();
$conf->set_field_delimiter("~");
$conf->set_key("d4121cb37d1edfbfeb76212064193925");
$conf->set_algo("sha256");
$conf->set_window(5*3600); //Seconds
$conf->set_acl("/*"); // /* <- for all
$token = $t->generate_token($conf);
$token_urlencode = urlencode($token);
print_r($token);
die();
ini_set('session.referer_check', 'TRUE');
$user_agent = $_SERVER["HTTP_USER_AGENT"];
$video_url="http://104.199.144.5/bplayer/video.php?id=".$_GET["id"];

$poster_url="./poster.jpg";
$referer = true;//$_SERVER["HTTP_REFERER"];


if(!preg_match("/visionias/i", $referer) || !preg_match("/kecua/i", $referer))
{
	//If iPad
	if (preg_match("/iPad/i", $user_agent) || preg_match("/iPhone/i", $user_agent))
	{
		$video_source="hls: \"http://104.199.144.5:1935/vod/smil:". $_GET["id"].".smil/playlist.m3u8\"";
		
	}
	else
	{	
		//https://visionias.akamaized.net/video/smil:450420190812180000.smil/manifest.mpd?hdnts=exp=1601490384~acl=/*~hmac=274b42acc88c67904f1c6118dfebe04eaea366e3322fe38b6428d3b6d25ed01d  
		//https://visionias.akamaized.net/vision-vod/smil:test.smil/playlist.m3u8?hdnts=<?php print $token; 
		//ttps://visionias.akamaized.net/vision-vod/

		$video_source = "dash: \"https://visionias.akamaized.net/video/smil:".$_GET["id"].".smil/manifest.mpd?hdnts=".$token_urlencode."\"";
		//$video_source="dash: \"".$video_url."\"";
	}
}
else
{
		print "This page must be accessed within an iFrame.";
		exit();
}
	

// user details

$user_details = 9201823;//$student_mobile ? $student_mobile : $student_email;

?>



<html>
<HEAD><TITLE>Visionias vod subham</TITLE>
	<link rel="stylesheet" href="css/style.css" crossorigin="anonymous">
	<link rel="stylesheet" href="css/mobile.css" crossorigin='anonymous'>
	<link rel="shortcut icon" href="img/svg/SVG/icon.svg">
	<link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet">
	<script type="text/javascript" src="js/dash.all.min.js"></script>
	<script type="text/javascript" src="js/Error.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>

<body>
	
	
	<div id='playerContainers'>
		
		
		<div id="playerContainer" style="height: 100%; width: 100%;"></div>
		
	</div>
	
	<script>	
		

const conf = {

	//4380201902171700
	userName: "subham" ,
	videoId:<?php echo $_GET["id"] ?>,


container: "playerContainer",
get link(){
	const isIOS =  navigator.platform && /iPad|iPhone/.test(navigator.platform);

	if(isIOS){
		 return {
			
			hls:`http://104.199.144.5:1935/vod/smil:${this.videoId}.smil/playlist.m3u8`
			
		 }
	}else{
		return{
			dash:'https://visionias.akamaized.net/video/smil:450420190812180000.smil/manifest.mpd?hdnts=exp=1601490384~acl=/*~hmac=274b42acc88c67904f1c6118dfebe04eaea366e3322fe38b6428d3b6d25ed01d'
			//	dash:"https://visionias.akamaized.net/video/smil:".$_GET["id"].".smil/manifest.mpd?hdnts=".$token_urlencode."\"";
			//dash:`http://104.199.144.5:1935/vod/smil:${this.videoId}.smil/manifest.mpd`
			
		}
	}

},

poster: "http://localhost/player/poster.jpg",
controls: {
	play: "true",
	seekBack: "true",
	seekFwd: "true",
	seekInterval: 10,
	sticky: "true",
	autoHide: "true",
	quality:"true",
	bookmark:false,
},
overlay: {
	show:true,
 	overlayText: '<?php echo $user_details?>', 
	pposX: 100,
	pposY: 200,
	displayDuration: 4000, // maximum time to be displayed milisec
	displayTimeout: 60 * 1000 * 2 , // maximum time after when is should be displayed again 
	minDisplayDuration:2000, // minimum time to be displayed
	minDisplayTimeout:60*1000 * 1 ,// min time after when is should be displayed again
	avoidVerticalArea:20 // percentage to avoid vertical screen , note range to be  kept in between 1 to 100 and should be an int value;

},overlayPhoneNumber:{
        show:true,
        posX:0,
		posY:0,
		positionX:'left',
        positionY:'top',
        mobileNumber:'<?php echo $user_details ?>' 
    },
refValidate: {
	image: "http://192.169.10.5:1935/vod/smil:42151608201701.smil/image.gif",
	timeout: 300
},
bookmark: {
	storage: "db",
	configFile: "bookmark/config.php",
}
};


	</script>
	
<script type="text/javascript" src="js/index.js"></script></body>

</html>
