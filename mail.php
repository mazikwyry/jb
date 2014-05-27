<?php
    if($_POST['email']){
        $headers = 'From: '.$_POST['email'] . "\r\n" .
                    'Reply-To: '.$_POST['email'].'' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();
        mail("joanna.bortel@yahoo.com, mazik.wyry@gmail.com", "Email ze strony joannabortel.com od ", "Email od ".$_POST['name']."\n".$_POST['text'], $headers);
    }
?>