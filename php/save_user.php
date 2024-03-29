<?php
require_once 'db.php';

$name = $_POST['name'];
$email = $_POST['email'];

if (empty($name) || empty($email)) {
    $response = array(
        'success' => false,
        'message' => 'Please fill out all fields'
    );
    echo json_encode($response);
    exit();
}

// Save user to database
$query = 'INSERT INTO users (name, email) VALUES (:name, :email)';
$stmt = $conn->prepare($query);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);

if ($stmt->execute()) {
    $share = 100 / $stmt->rowCount();
    $response = array(
        'success' => true,
        'share' => number_format($share, 2) . '€'
    );
    echo json_encode($response);
} else {
    $response = array(
        'success' => false,
        'message' => 'Error saving user'
    );
    echo json_encode($response);
}
?>
