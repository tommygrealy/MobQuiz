<?php

session_start();

if (!empty($_GET)) {
    
    $teamname = $_GET['teamname'];
    $_SESSION['teamname'] = $teamname;
    #echo("$teamname is now registered");


    // Redirect the user to the quiz page. 
    header("Location: AnswerQuestion.php");
    die("Redirecting...");
} else {
    
    ?>

    Enter team name: <form method="GET" action="register.php">
        <input type="text" name="teamname"/>
        <input type="submit">
    </form>

    <?php
}
?>
