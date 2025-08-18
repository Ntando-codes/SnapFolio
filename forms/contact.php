<?php
  // Your receiving email address
  $receiving_email_address = 'ntando.codes@gmail.com';

  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
  } else {
    die('Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  $contact->to = $receiving_email_address;
  $contact->from_name = isset($_POST['name']) ? $_POST['name'] : '';
  $contact->from_email = isset($_POST['email']) ? $_POST['email'] : '';
  $contact->subject = isset($_POST['subject']) ? $_POST['subject'] : 'New Contact Form Submission';

  // SMTP (recommended for reliability)
  /*
  $contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => 'ntando.codes@gmail.com',
    'password' => 'your-app-password-here', // Use Gmail App Password
    'port' => '587'
  );
  */

  $contact->add_message($contact->from_name, 'From');
  $contact->add_message($contact->from_email, 'Email');
  if (isset($_POST['phone'])) {
    $contact->add_message($_POST['phone'], 'Phone');
  }
  $contact->add_message(isset($_POST['message']) ? $_POST['message'] : '', 'Message', 10);

  // Efficient response for AJAX
  $result = $contact->send();
  if ($result === 'OK') {
    echo 'OK';
  } else {
    echo $result;
  }
?>
