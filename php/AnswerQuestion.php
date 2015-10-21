<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Team Registration Page</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
        <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
        <script src="scripts/quizanswer.js"></script>
        <?php
            session_start();
            if (empty($_SESSION['teamname'])){
                header("Location: register.php");
                die("Redirecting to registration page...");
            }
            $teamname = $_SESSION['teamname'];
        ?>
    </head>
    <body>
        <?php echo $teamname . "<br>"?>
        Enter Answer:
        <form action="">
            <input id="m" autocomplete="off" /><br>
            <input type="hidden" id="teamname" value="<?php echo $teamname;?>"/>
            <button>Send</button>
        </form>
        <div id="messages">
            
        </div>
        <div id="scoreboard">
            
        </div>
        
       
    </body>
</html>
