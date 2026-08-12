<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['errors' => [['message' => 'Method not allowed']]]);
    exit;
}

// Sanitize inputs
$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_SPECIAL_CHARS);
$industry = filter_input(INPUT_POST, 'industry', FILTER_SANITIZE_SPECIAL_CHARS);
$timeline = filter_input(INPUT_POST, 'timeline', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_VALIDATE_PHONE);
$challenge = filter_input(INPUT_POST, 'challenge', FILTER_VALIDATE_PHONE); 
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

if (!$email || empty($message)) {
    http_response_code(400);
    echo json_encode(['errors' => [['message' => 'Please provide a valid email and message.']]]);
    exit;
}

// Mail settings
$to      = 'contact@sp3digital.com';
$mailSubject = "New Contact Form Submission: $industry -> $company" : "New Contact Form Submission";
$body    = "Name: $name\nEmail: $email\nPhone: $phone\nIndustry: $industry\nCompany: $company\n\nChallenge: $challenge\n\nMessage:\n$message";

echo json_encode(['success' => true]);

$headers = [
    'From' => 'contact@sp3digital.com', // Must match your GoDaddy domain/cPanel email to avoid spam blocks
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion()
];

if (mail($to, $mailSubject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['errors' => [['message' => 'Failed to send message via mail server.']]]);
}