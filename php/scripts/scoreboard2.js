$(document).ready(function () {
    var socketServer = "localhost";
    var socket = io.connect('//' + socketServer + ':3000/');




    var scoreboard = [];


    var pointsAvailable = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]



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

    socket.on('NextQuestion', function(data){
        console.log("Server sent next question command (now at question#: "+data.QuestionNumber+")")
        $('#liveFeedTbl').empty();
        $('#qnum').html(data.QuestionNumber);
        pointsAvailable = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
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


    function reDrawScoreboard()
    {
        sortScoreboard();
        $('#scoreboard').empty();
        for (var i in scoreboard) {
            $('#scoreboard').append("<tr><td>" + scoreboard[i].Name + "</td><td>" + scoreboard[i].Score + "</td></tr>")
        }
        console.log(JSON.stringify(scoreboard))

    }

    function sortScoreboard() {
        scoreboard.sort(function(a, b) {
        var x = a["Score"]; var y = b["Score"];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    })
    }





//TODO: Save and Recover Scoreboard State - this function should exist on the server and listen for scoreboard messages emmitted from here
//TODO: 
    function saveScoreBoard(){
   
    }

    function loadScoreBoard() {
        //TODO: this fn will run when a "recoverScoreboard" event is recieved from the server. 
        //said event is triggered by the quizmaster hitting a "recover" button in Quizmaster.html

    }


    updateScoreForTeam("Paul", 54)

    console.log(scoreboard);

})