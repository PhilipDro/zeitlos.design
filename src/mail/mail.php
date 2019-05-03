<?php

header('Content-type: application/json');

$errors = '';

// set received values
if(empty($errors)) {

  if($_POST['productName'] != NULL) {
    $productName = '<span>Produkt Name: </span>' .  '<strong>' . ucfirst($_POST['productName']) . '</strong><br>';
  }
  else {
    $productName = '';
  }

//  if($_POST['stain'] != NULL) {
//    $stain = '<span>Gebeizt auf: </span>' .  '<strong>' . ucfirst($_POST['stain']) . '</strong><br>';
//  }
//  else {
//    $stain = '';
//  }
//  if($_POST['deco'] == null) {
//    $deco = '<span>Vorderleisten: </span><strong>Keine</strong><br>';
//  }
//  else {
//    $deco = '<span>Vorderleisten: </span><strong>Vorhanden</strong><br>';
//  }
//  if($_POST['ledge'] == null) {
//    $ledge = '<span>Kranzleisten: </span><strong>Keine</strong><br>';
//  }
//  else {
//    $ledge = '<span>Kranzleisten: </span><strong>Vorhanden</strong><br>';
//  }
//  if($_POST['drawer'] != NULL AND $_POST['drawer'] != 0 AND isset($_POST['drawer'])) {
//    $drawer = '<span>Schubladen: </span>' .  '<strong>' . ucfirst($_POST['drawer']) . '</strong><br>';
//  }
//  else {
//    $drawer = '';
//  }
//  if($_POST['leoDrawers'] != NULL AND $_POST['leoDrawers'] != 0 AND isset($_POST['leoDrawers'])) {
//    $leoDrawers = '<span>Schubladen: </span>' .  '<strong>' . ucfirst($_POST['leoDrawers']) . '</strong><br>';
//  }
//  else {
//    $leoDrawers = '';
//  }
//  if($_POST['slidingDoor'] != NULL AND $_POST['slidingDoor'] != 0 AND isset($_POST['slidingDoor'])) {
//    $slidingDoor = '<span>Schiebetüren: </span>' .  '<strong>' . ucfirst($_POST['slidingDoor']) . '</strong><br>';
//  }
//  else {
//    $slidingDoor = '';
//  }
//  if($_POST['surface'] != NULL) {
//    $surface = '<span>Oberflächenbehandlung: </span>' .  '<strong>' .ucfirst($_POST['surface']) . '</strong><br>';
//  }
//  else {
//    $surface = '';
//  }

  // $stain = $_POST['stain'];
  // $drawer = $_POST['drawer'];
  // $leoDrawers = $_POST['leoDrawers'];
  // $surface = $_POST['surface'];

  $properties = $productName;

  //message to customer
  $from_name = 'Regale nach Mass';
  $from_email = 'junk@philipdrozd.com';
  $message ='<h2>Danke für Ihre Anfrage.</h2><p>Sie interessieren sich für folgendes Regal:</p>' . $properties .
    '<p>Wir werden uns in Kürze mit Ihnen in Verbindung setzen, um Weiteres zu besprechen.</p>' .
    '<p>Mit freundlichen Grüßen, <br />Ihr Massregal-Team'
  ;

  $to_email = $_POST['mail'];

  $subject = 'Regale nach Mass - Ihre Anfrage ist eingegangen';

  //headers to customer
  $headersCustomer .= "MIME-Version: 1.0\r\n";
  $headersCustomer .= "Content-Type: text/html; charset=UTF-8\r\n";
  $headersCustomer .= "From: massregal-artd\n";
  $headersCustomer .= "Reply-To: $from_email";

  //message to base
  $subject_base = 'Regale nach Mass - Neue Anfrage';
  $to_email_base = 'junk@philipdrozd.com';

  $message_base = 'Telefonnummer des Klienten: Test';

//  $message_base = 'Telefonnummer des Klienten: ' . '<strong>' . $_POST['phone'] . '</strong>' .
//    '<p>Mail des Kunden:</p><br>' .
//    $_POST['mail'] .
//    '<p>Nachricht des Kunden:</p><br>' .
//    $_POST['message'] .
//    '<br><p>Kunde hat Interesse an folgendem Regal:</p>'.
//    $properties
//  ;

  //headers to base
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
  $headers .= "From: massregal-artd\n";
  $headers .= "Reply-To: $to_email";


  mail($to_email,$subject, $message, $headersCustomer); //mail to customer
  mail($to_email_base,$subject_base, $message_base, $headers); //mail to base

  $response_array['status'] = 'success';
  echo json_encode($response_array);
}
else {
  $response_array['status'] = 'error';
  echo json_encode($response_array);
}

?>
