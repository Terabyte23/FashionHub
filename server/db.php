<?php
// Всегда отправляем CORS заголовки
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Обработка preflight - ВАЖНО: делаем это ДО session_start()
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

session_name('FASHIONHUBSESSID');
session_start();

function json_response($payload, int $code = 200) {
  http_response_code($code);
  header("Content-Type: application/json; charset=UTF-8");
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

function pdo() {
  static $pdo = null;
  if ($pdo) return $pdo;
  $host = '127.0.0.1';
  $db   = 'fashionhub';
  $user = 'root';
  $pass = '';    
  $dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";
  try {
    $pdo = new PDO($dsn, $user, $pass, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    return $pdo;
  } catch (Throwable $e) {
    json_response(['error' => 'DB connection failed: ' . $e->getMessage()], 500);
  }
}