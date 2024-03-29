<?php

require_once 'db.php';

try {
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )";
    $conn->exec($sql);
    echo "Table users created successfully\n";
} catch(PDOException $e) {
    echo $sql . "\n" . $e->getMessage();
}

$conn = null;
?>
