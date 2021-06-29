<?php
require_once("./config.php");

$video_id = explode("smil:", $_GET["url"],2);
$video_id = explode(".", $video_id[1],2);
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

//\$query = "select * from user_bookmarks where video_id=$video_id[0] order by location";
$query = "select * from user_bookmarks where video_id=4380201902171700 AND bookmark_id =(SELECT MAX(bookmark_id) from user_bookmarks) order by location";
$result = mysqli_query($conn, $query);

$bookmarks = array();
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_assoc($result))
	{
		$bookmarks[ ] = $row;
        //echo "id: " . $row["id"]. " - Time: " . $row["location"]. " " . $row["comment"]. "<br>";
    }
	echo json_encode($bookmarks);
}
else
{
    echo "0";
}
mysqli_close($conn);

?>
