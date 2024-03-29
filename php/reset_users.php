<?php
require_once 'db.php';

// Reset users in the database
$query = 'DELETE FROM users';
$stmt = $conn->prepare($query);

if ($stmt->execute()) {
    echo 'Users reset successfully';
} else {
    echo 'Error resetting users';
}
?>
