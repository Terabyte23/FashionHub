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

if (!isset($_SESSION['user']['id'])) {
    json_response(["success" => false, "message" => "Not authenticated"], 401);
}

$userId = (int)$_SESSION['user']['id'];

if (!isset($_FILES['avatar'])) {
    json_response(["success" => false, "message" => "File is required"], 400);
}

$file = $_FILES['avatar'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    json_response(["success" => false, "message" => "Upload error"], 400);
}

$maxSize = 2 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    json_response(["success" => false, "message" => "File too large (max 2MB)"], 400);
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!in_array($file['type'], $allowedTypes)) {
    json_response(["success" => false, "message" => "Only JPG, PNG, WEBP allowed"], 400);
}

$uploadDir = __DIR__ . '/uploads/avatars/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'avatar_' . $userId . '_' . time() . '.' . $ext;
$targetPath = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    json_response(["success" => false, "message" => "Failed to save file"], 500);
}

$publicPath = '/server/uploads/avatars/' . $filename;

$stmt = $pdo->prepare("UPDATE users SET avatar = :avatar WHERE id = :id");
$stmt->execute([
    ':avatar' => $publicPath,
    ':id'     => $userId,
]);

$_SESSION['user']['avatar'] = $publicPath;

json_response([
    "success"   => true,
    "message"   => "Avatar updated",
    "avatarUrl" => $publicPath,
]);
