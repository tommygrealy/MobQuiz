<?php 


     
    // We remove the user's data from the session 
    unset($_SESSION['teamname']); 
     
    // We redirect them to the login page 
    header("Location: register.php"); 
    die("Redirecting to: registration page");
 ?>