<?php
$referer = substr($_SERVER["HTTP_REFERER"],0,43);

/*
if($referer=="http://104.199.144.5/bplayer/player.php?id=") 
{
	$video_url="http://104.199.144.5:1935/vod/smil:". $_GET["id"].".smil/manifest.mpd";
}
else
{
	//Sample video URL
	$video_url="http://172.16.0.2:1935/vod/smil:italy.smil/manifest.mpd";
}

*/
$video_url="http://104.199.144.5:1935/vod/smil:". $_GET["id"].".smil/manifest.mpd";
readfile($video_url);
?>