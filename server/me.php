<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/db.php';

if (!isset($_SESSION['user'])) {
    json_response([
        'authenticated' => false,
        'user' => null,
    ]);
}

json_response([
    'authenticated' => true,
    'user' => $_SESSION['user'],
]);
