<?php

/* ajout du formulaire de contact */
add_action('wp_ajax_contact', '_ajax_contact');
add_action('wp_ajax_nopriv_contact', '_ajax_contact');

function _ajax_contact()
{

  /* on verifie le nonce de sécurité  */

  check_ajax_referer('ajax_contact_nonce', 'security');

   /* protection des variables  */

   $subject = wp_strip_all_tags($_POST['subject']); // sujet du message
   $name = wp_strip_all_tags($_POST['name']); // nom de l'expediteur
   $sender = sanitize_email($_POST['email']); // email propre de l'expediteur
   $message = nl2br(stripslashes(wp_kses($_POST['message'], $GLOBALS['allowedtags']))); //on transforme les saut de ligne ,puis suppression des antislash ajouté par wordpress, puis suppression d'eventuel php

   /* gestion des headers */
   $headers = [];
    $headers[] = 'FROM :'.$name.' <'.$sender.'>'."\r\n";

   /* gestion du message */
  ob_start(); // mise en tampon
  include TEMPLATEPATH.'/template/contact.php';
    $mail = ob_get_contents();
    ob_end_clean();

  /* Envoi du mail */

  // support d'un contenu Html dans l'email
  add_filter('wp_mail_content_type', create_function('', 'return "text/html";'));
  /* pour voir le html dans un mail */
  $adminMail = get_option('admin_email');
  if (wp_mail($adminMail, $subject, $mail, $headers)) {
      // le mail est envoyer
    wp_send_json('success');
  } else {

    // le mail n'as pas été envoyer
    wp_send_json('error');
  }
}
