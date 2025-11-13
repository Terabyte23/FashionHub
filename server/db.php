<?php
session_start();

$dsn = "mysql:host=localhost;dbname=fashionhub;charset=utf8mb4";
$user = "root";
$pass = "";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

function json_response($data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);
    exit;
}
