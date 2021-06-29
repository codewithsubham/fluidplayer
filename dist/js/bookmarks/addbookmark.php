<?php
require_once("./config.php");
$user_id = "ksdwivedi@visionias.in";
$video_id = explode("smil:", $_GET["url"],2);
$video_id = explode(".", $video_id[1],2);



$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
$query = "insert into user_bookmarks (`video_id`, `video_url`, `user_id`, `location`, `comment`) values (\"$video_id[0]\", \"".$_GET["url"]."\", \"$user_id\",\"".$_GET["timestamp"]."\",\"".$_GET["comment"]."\")";
$result = mysqli_query($conn, $query);

if(!$result)
{
	echo "0";
}
mysqli_close($conn);

//bookmarks/addbookmark.php?url=http://localhost:1935/vod/smil:42151608201701.smil/playlist.m3u8&comment=test bookmark&timestamp=0
?>
