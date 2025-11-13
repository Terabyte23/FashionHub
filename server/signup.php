<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(["success" => false, "message" => "Only POST allowed"], 405);
}

$input = json_decode(file_get_contents("php://input"), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if ($name === '' || $email === '' || $password === '') {
    json_response(["success" => false, "message" => "Name, email and password are required"], 400);
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
$stmt->execute([':email' => $email]);
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    json_response(["success" => false, "message" => "Email already in use"], 409);
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
    INSERT INTO users (name, email, password_hash, role, created_at)
    VALUES (:name, :email, :password_hash, 'user', NOW())
");
$stmt->execute([
    ':name'          => $name,
    ':email'         => $email,
    ':password_hash' => $hash,
]);

$userId = (int)$pdo->lastInsertId();

$_SESSION['user'] = [
    'id'     => $userId,
    'name'   => $name,
    'email'  => $email,
    'avatar' => null,
    'role'   => 'user',
];

json_response([
    "success" => true,
    "user"    => $_SESSION['user'],
]);
