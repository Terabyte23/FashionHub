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

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if ($email === '' || $password === '') {
    json_response(["success" => false, "message" => "Email and password required"], 400);
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
$stmt->execute([':email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    json_response(["success" => false, "message" => "Invalid email or password"], 401);
}

if (!password_verify($password, $user['password_hash'])) {
    json_response(["success" => false, "message" => "Invalid email or password"], 401);
}

$_SESSION['user'] = [
    'id'     => (int)$user['id'],
    'name'   => $user['name'],
    'email'  => $user['email'],
    'avatar' => $user['avatar'] ?? null,
    'role'   => $user['role'] ?? null,
];

json_response([
    "success" => true,
    "user"    => $_SESSION['user'],
]);
