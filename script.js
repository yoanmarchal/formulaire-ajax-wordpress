(function () {
  if( $('#send-message').length > 0) {
    // on ajoute la div de message d'erreur ou succes
    $('#contact-form').append('<div id="noty-msg"></div>');
    /* eviter le multiclick */
    var busy = null ;
    // a la soumission du formulaire
    $('#send-message').click( function() {
        var error = false,
            form  = $(this).parents('form');
            $('#noty-msg').stop().html('');

            console.log('as cliqué');

            form.find('[required]').each( function() {
              // Validate Email
                // on vérifie si le champ est vide ou non
                if ( $.trim( $(this).val() ) === '' ) {

                  $(this).css('border-color', '#ff0000');
                  error = true;
                }
                else {
                  $(this).css('border-color', '#cdcdcd');
                }
             });


            var email = $("#contact-email").val();
            if ((/(.+)@(.+){2,}\.(.+){2,}/.test(email)) || email==="" || email===null) { } else {
              error = true;
              $('#noty-msg').attr('class', 'noty-error').html('Please enter a valid email');
            }

        if ( !error ) {
          if (busy) {
             busy.abort();
          }

          busy = $.ajax({
            url: ajaxurl,
            action:'contact',
            type:'POST',
            data:form.serialize(),
            success: function( response ){
                console.log('attente de reponse send ajax');
                if ( response === 'success') {
                  console.log('envoyé avec succes');
                  //on vide  le formulaire
                  form[0].reset();

                  // on affiche un msg de success
                  $('#noty-msg').attr('class', 'noty-success').html('Merci ! votre message as bien été envoyé, nous vous contacterons dans les plus brefs délais.');
                  console.log('Merci ! votre message as bien été envoyé, nous vous contacterons dans les plus brefs délais.');
                }

                if (response === 'error') {
                  console.log('ajax non terminé');
                  // on affiche le message d'erreur
                  $('#noty-msg').attr('class', 'noty-error').html('Nous sommes désolé mais une erreur est survenue lors de l\'envoi de votre message .');
                  console.log('Nous sommes désolé mais une erreur est survenue lors de l\'envoi de votre message .');

                }
            }
          });
        }
        
        else  {
           $('#noty-msg').attr('class', 'noty-error').html('Merci de remplir tout les champ ci dessous .');
           console.log('Merci de remplir tout les champ ci dessous .');
        }
        console.log('after check error');
        // on affiche le message
          
        $('#noty-msg').slideDown();
        $('#noty-msg').delay(5000).slideUp();


        return false;
    });
  }
}());
