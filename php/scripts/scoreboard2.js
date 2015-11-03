$(document).ready(function () {
    var socketServer = "localhost";
    var socket = io.connect('//' + socketServer + ':3000/');




    var scoreboard = [];


    var pointsAvailable = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]

    var questionNumber = 1;


//socket.io must be loaded at this point.



    socket.on('chat message', function (data) {
        //addAnswerToFeed(data)
        console.log("Answer recieved from Team - " + JSON.stringify(data))
        $('#liveFeedTbl').append('<tr><td>' + data.Team + ' answered</td><td id="chkmark_' + data.Team.replace(/\s+/g, '') + '"></td></tr>')
    });

    socket.on('AnswerChecked', function (data) {
        console.log("Answer checked by qm:" + JSON.stringify(data))
        var pointsToAdd
        var elementToUpdate = "#chkmark_" + data.team.replace(/\s+/g, '')
        if (data.decision == "correct") {
            pointsToAdd = grabPoints()
            updateScoreForTeam(data.team, pointsToAdd);
            $(elementToUpdate).html('<span style="color:green">CORRECT</span>');
        }
        else {
            $(elementToUpdate).html('<span style="color:red">INCORRECT</span>');
        }
        reDrawScoreboard();
    })

    socket.on('NewTeam', function (data) {
        console.log("Team: " + JSON.stringify(data.teamname) + " joined - (id=" + socket.id + ")")
        addNewTeam(data.teamname);
    })



    console.log(scoreboard);

    function addNewTeam(teamname) {
        var alreadyRegistered = false;
        console.log("Add new team called: " + teamname)
        var team = {"Name": teamname, "Score": 0}
        for (i in scoreboard) {
            if (scoreboard[i].Name == teamname) {
                alreadyRegistered = true;
            }
        }
        if (!alreadyRegistered) {
            scoreboard.push(team);
        }
        reDrawScoreboard();
    }

    function updateScoreForTeam(teamname, ptsToAdd) {
        console.log("Updating score - adding " + ptsToAdd + " to " + teamname + "'s total")
        for (var i in scoreboard) {
            if (scoreboard[i].Name == teamname) {
                scoreboard[i].Score = scoreboard[i].Score + ptsToAdd;
                console.log("Points addded");
                break;
            }
        }
    }

    function grabPoints() {
        console.log(pointsAvailable);
        if (pointsAvailable.length > 0)
        {
            return pointsAvailable.shift();
        }
        else
            return 1;
    }

    function newQuestionReset()
    {
        //call when newQuestion emmited from qm
        questionNumber++;
        pointsAvailable = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]
        $('#liveFeedTbl').empty();
    }

    function reDrawScoreboard()
    {
        sortScoreboard();
        //html stuff 
        $('#scoreboard').empty();
        for (var i in scoreboard) {
            $('#scoreboard').append("<tr><td>" + scoreboard[i].Name + "</td><td>" + scoreboard[i].Score + "</td></tr>")
        }
        console.log(JSON.stringify(scoreboard))

    }

    function sortScoreboard() {

    }



    function addAnswerToLiveFeed(data) {

    }

//TODO: Save and Recover Scoreboard State - this function should exist on the server and listen for scoreboard messages emmitted from here
//TODO: 
    function recoverScoreBoard() {
        //TODO: this fn will run when a "recoverScoreboard" event is recieved from the server. 
        //said event is triggered by the quizmaster hitting a "recover" button in Quizmaster.html

    }


    updateScoreForTeam("Paul", 54)

    console.log(scoreboard);

})