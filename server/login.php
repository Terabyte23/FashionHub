<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Only POST requests are allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if ($email === 'test@fashionhub.com' && $password === '12345') {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "user" => ["email" => $email]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email or password"
    ]);
}
