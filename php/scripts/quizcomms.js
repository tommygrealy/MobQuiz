/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//setInterval(function(){loadinfo(5)},5000)

// When running on WIFI network @ home
var socketServer = window.location.hostname;

// When running on Razri phone hotspot
//var socketServer = '192.168.43.44'

function prependMessageFadeIn(data) {
    $('<div data-role="collapsible" style="display: none"><h3>' + data.header + '</h3><p>' + data.msg + '</p></div>').prependTo("#content")
    $('#content').find('div[data-role=collapsible]').collapsible({
        refresh: true
    });
    $('#content').find('div[style="display: none"]').show('slow')
}

var socket;

var questionNum=1;

$(document).ready(function () {
    //loadinfo(10);
    socket = io.connect('//' + socketServer + ':3000/');

    socket.on('welcome', function (data) {
        //$('#messages').append('<li>' + data.message + '</li>');
        console.log("Socket connection successful")
        socket.emit('i am client', {
            data: 'foo!'
        });
    });

    socket.on('NewTeam', function(data){
        console.log("New team: "+JSON.stringify(data));
    })

    socket.on('chat message', function (data) {
        addAnswer(data)
        console.log("Answer sent - " + JSON.stringify(data))
    });
    socket.on('error', function () {
        console.error(arguments)
    });
    socket.on('team answer', function (data) {
        console.log(JSON.stringify(data));
    });

    $('#btnNextQ').click(function(){
        questionNum++;
        var data={"QuestionNumber":questionNum};
        socket.emit('NextQuestion',data);
        $('#qnum').html(questionNum);
    })
    
    $('#btnNextPic').click(function(){
        var data={"PictureNumber":$('#picNum').val()};
        socket.emit('NextPicture',data);
        console.log("Sending: " + JSON.stringify(data));
    })
})


function addAnswer(data) {
    teamNameStripped=data.Team.replace(/\s+/g, '');
    divId='answerFrom_'+ teamNameStripped;
    console.log("Adding elements from: " + JSON.stringify(data));
    $('<div data-role="collapsible" id="'+divId+'"><h3>' + data.Team + ' answered: <strong>'+ data.AnswerText +'</strong></h3><p>' +
            '<button onclick = "acceptAns(\''+ data.Team +'\');$('+divId+').fadeOut()" >Accept Answer</button><button onclick = "rejectAns(\''+ data.Team+'\');$('+divId+').fadeOut()">Reject Answer</button>'+
            '</p></div>').appendTo("#answers")
    $('#content').find('div[data-role=collapsible]').collapsible({
        refresh: true
    });
    //$('#content').find('div[style="display: none"]').show('slow')
}

function acceptAns(team){
    console.log ("Answer marked as CORRECT for team:" +team)
    socket.emit("AnswerChecked", {"team":team,"decision":"correct"})
}

function rejectAns(team){
    console.log ("Answer marked as INCORRECT for team:" +team)
    socket.emit("AnswerChecked", {"team":team,"decision":"incorrect"})
}