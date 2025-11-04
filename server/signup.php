<?php
require __DIR__.'/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['status'=>'error','message'=>'Only POST allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true) ?: [];
$email = trim($data['email'] ?? '');
$name  = trim($data['name'] ?? '');
$pass  = $data['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['status'=>'error','message'=>'Invalid email'], 422);
}
if (strlen($pass) < 5) {
  json_response(['status'=>'error','message'=>'Password too short'], 422);
}

$pdo = pdo();
$stmt = $pdo->prepare("SELECT id FROM users WHERE email=?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
  json_response(['status'=>'error','message'=>'Email already registered'], 409);
}

$hash = password_hash($pass, PASSWORD_DEFAULT);
$ins = $pdo->prepare("INSERT INTO users(email,password_hash,name) VALUES(?,?,?)");
$ins->execute([$email, $hash, $name]);

$_SESSION['user'] = [
  'id' => $pdo->lastInsertId(),
  'email' => $email,
  'name' => $name,
  'role' => 'user'
];

json_response(['status'=>'success','message'=>'Registered','user'=>$_SESSION['user']]);