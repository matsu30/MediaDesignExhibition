<?php
ini_set('display_errors',1);
var_dump($_POST);

$data = $_POST['base64'];

if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
   $data = substr($data, strpos($data, ',') + 1);
   $type = strtolower($type[1]); // jpg, png, gif

   if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
       throw new \Exception('invalid image type');
   }

   $data = base64_decode($data);

   if ($data === false) {
       throw new \Exception('base64_decode failed');
   }
} else {
   throw new \Exception('did not match data URI with image data');
}

file_put_contents("img.{$type}", $data);


$db = mysqli_connect('localhost', 'root', '', 'mydb') or 
die(mysqli_connect_error());
mysqli_set_charset($db, 'utf8');

$sql = sprintf('INSERT INTO suki SET title="%s", 
                                     body="%s", 
                                     img="%s"',
     mysqli_real_escape_string($db, $_POST['title']),
     mysqli_real_escape_string($db, $_POST['body']),
     mysqli_real_escape_string($db, 'img')
);

mysqli_query($db, $sql) or die(mysqli_error($db));
?>

<?php
// $db = mysqli_connect('localhost', 'root', '', 'mydb') or 
// die(mysqli_connect_error());
// mysqli_set_charset($db, 'utf8');
?>
