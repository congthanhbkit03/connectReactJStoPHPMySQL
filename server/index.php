<?php

/* Handle CORS */

// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');

// Exit early so the page isn't fully loaded for options requests
if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

//get attribute in object
$email = $data->email;
$password = $data->password;


//ket noi csdl
$conn = mysqli_connect("localhost", "root", "", "ecommerceshop");

//sql
$sql = "select * from users where email = '$email' and password = '$password'";
$result = mysqli_query($conn, $sql);

$res = new stdClass();  //PHP object
if (mysqli_num_rows($result) > 0){ //dang nhap thanh cong - tra ve status ok + ten
    $res->status = "ok";
    $res->name = mysqli_fetch_assoc($result)['name'];
} else {
    $res->status = "failed";
    $res->message = "Đăng nhập thất bại";
}

echo json_encode($res);