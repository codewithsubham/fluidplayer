<?php
require_once("./config.php");
$user_id = "ksdwivedi@visionias.in";
//$video_id = explode("smil:", $_GET["url"],2);
//$video_id = explode(".", $video_id[1],2);



$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
$query = "delete from user_bookmarks where bookmark_id = ".$_GET["id"];
$result = mysqli_query($conn, $query);

if(!$result)
{
	echo "0";
}
mysqli_close($conn);

//bookmarks/addbookmark.php?url=http://localhost:1935/vod/smil:42151608201701.smil/playlist.m3u8&comment=test bookmark&timestamp=0
?>
