<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Quiz Page</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
        <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
        <script src="scripts/quizanswer.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <?php
        session_start();
        if (empty($_SESSION['teamname'])) {
            header("Location: register.php");
            die("Redirecting to registration page...");
        }
        $teamname = $_SESSION['teamname'];
        ?>
    </head>
    <body style="background-image:url('images/christmas-snowflake-green-background.jpg');background-repeat: repeat;">
        <div class="container">
            <div class="row">
                <div class="row">&nbsp;</div> <!-- make space at top!-->
                <div class="col-sm-10" style="height: 600px;background-color: rgba(245, 245, 245, 0.8);">
                    <div class="row bg-info"><p class="h3 text-center text-info" ><?php echo $teamname; ?> </p>

                    </div>
                    <form action="" style="text-align: center;">
                        <br> <h4>Input your answer to Question #<span id='qnum'>1</span></h4>
                        <input type="text" class="input-lg" id="m" autocomplete="off" /><br>
                        <input type="hidden" id="teamname" value="<?php echo $teamname; ?>"/>
                        <div class="row">&nbsp;</div>
                        <button class="btn-lg">Send</button>
                    </form>
                    <!--Footer -->
                    <div class="nav navbar-fixed-bottom text-left"  style="background-color: #fff;"> 
                        <div class="row well-sm">
                            <div class="col-lg-8 col-lg-offset-2 well-transparent"> 
                                <span class="text-info">Developed by:</span>
                                <img src="images/flex.png">
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>



    </body>
</html>
