<?php
// ==================================================
// RSVP - Sonia & Rondineli
// Envio via PHPMailer + Gmail SMTP
// ==================================================

// 1) Instale o PHPMailer no servidor ou via Composer:
// composer require phpmailer/phpmailer
//
// 2) Este arquivo espera a pasta vendor/ na raiz:
// vendor/autoload.php
//
// 3) Nunca use sua senha pessoal do Gmail.
// Use uma Senha de App gerada na Conta Google.

<?php

require __DIR__ . '/vendor/PHPMailer/src/Exception.php';
require __DIR__ . '/vendor/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/vendor/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

function limpar($valor) {
    return htmlspecialchars(trim($valor ?? ''), ENT_QUOTES, 'UTF-8');
}

$nome      = limpar($_POST['name'] ?? '');
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$whatsapp  = limpar($_POST['whatsapp'] ?? '');
$presenca  = limpar($_POST['presence'] ?? '');
$adultos   = limpar($_POST['adults'] ?? '0');
$criancas  = limpar($_POST['children'] ?? '0');
$mensagem  = limpar($_POST['message'] ?? '');

if (!$nome || !$email || !$whatsapp || !$presenca) {
    die('Por favor, preencha os campos obrigatórios.');
}


// ================= CONFIGURAÇÕES =================

$config = require __DIR__ . '/config.php';

$smtpEmail   = $config['smtp_email'];
$smtpSenha   = $config['smtp_password'];
$emailDestino = $config['email_destino'];

try {
    $mail = new PHPMailer(true);

    // Configuração SMTP Gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpEmail;
    $mail->Password   = $smtpSenha;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Remetente
    $mail->setFrom($smtpEmail, 'RSVP Sonia & Rondineli');

    // Destinatário principal
    $mail->addAddress($emailDestino);

    // Permite responder direto ao convidado
    $mail->addReplyTo($email, $nome);

    $mail->isHTML(true);
    $mail->Subject = 'Nova confirmação de presença - Sonia & Rondineli';

    $mail->Body = "
        <h2>Nova confirmação de presença</h2>
        <p><strong>Nome:</strong> {$nome}</p>
        <p><strong>E-mail:</strong> {$email}</p>
        <p><strong>WhatsApp:</strong> {$whatsapp}</p>
        <p><strong>Confirma presença?</strong> {$presenca}</p>
        <p><strong>Adultos:</strong> {$adultos}</p>
        <p><strong>Crianças:</strong> {$criancas}</p>
        <p><strong>Mensagem:</strong><br>{$mensagem}</p>
    ";

    $mail->AltBody = "
        Nova confirmação de presença

        Nome: {$nome}
        E-mail: {$email}
        WhatsApp: {$whatsapp}
        Confirma presença? {$presenca}
        Adultos: {$adultos}
        Crianças: {$criancas}
        Mensagem: {$mensagem}
    ";

    $mail->send();

    // E-mail automático para o convidado
    $confirmacao = new PHPMailer(true);
    $confirmacao->isSMTP();
    $confirmacao->Host       = 'smtp.gmail.com';
    $confirmacao->SMTPAuth   = true;
    $confirmacao->Username   = $smtpEmail;
    $confirmacao->Password   = $smtpSenha;
    $confirmacao->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $confirmacao->Port       = 587;
    $confirmacao->CharSet    = 'UTF-8';

    $confirmacao->setFrom($smtpEmail, 'Sonia & Rondineli');
    $confirmacao->addAddress($email, $nome);

    $confirmacao->isHTML(true);
    $confirmacao->Subject = 'Recebemos sua confirmação!';
    $confirmacao->Body = "
        <h2>Olá, {$nome}!</h2>
        <p>Recebemos sua confirmação com muito carinho.</p>
        <p>Estamos muito felizes por compartilhar esse momento especial com você.</p>
        <p><strong>Sonia ❤️ Rondineli</strong></p>
    ";

    $confirmacao->AltBody = "Olá, {$nome}! Recebemos sua confirmação. Sonia e Rondineli agradecem com carinho.";

    $confirmacao->send();

    header('Location: obrigado.html');
    exit;

} catch (Exception $e) {
    echo 'Não foi possível enviar sua confirmação. Erro: ' . $mail->ErrorInfo;
}
?>
