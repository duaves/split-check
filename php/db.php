<?php
$host = 'your_db_host';
$db_name = 'your_db_name';
$username = 'your_db_username';
$password = 'your_db_password';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'Connection Error: ' . $e->getMessage();
    exit();
}
?>
