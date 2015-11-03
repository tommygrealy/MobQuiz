/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//setInterval(function(){loadinfo(5)},5000)

// When running on WIFI network @ home
var socketServer = 'localhost'

function prependMessageFadeIn(data) {
    $('<div data-role="collapsible" style="display: none"><h3>' + data.header + '</h3><p>' + data.msg + '</p></div>').prependTo("#content")
    $('#content').find('div[data-role=collapsible]').collapsible({
        refresh: true
    });
    $('#content').find('div[style="display: none"]').show('slow')
}



$(document).ready(function () {
    //loadinfo(10);
    var socket = io.connect('//' + socketServer + ':3000/');

    socket.on('welcome', function (data) {
        console.log("Socket connection successful")
        socket.emit('NewTeam', {
            teamname: $('#teamname').val()
        });
    });

    socket.on('error', function () {
        console.error(arguments)
    });
    socket.on('message', function (data) {
        console.log(JSON.stringify(data))
    });
   
    $('form').submit(function () {
        var myAnswer={};
        myAnswer.Team = $('#teamname').val();
        myAnswer.AnswerText = $('#m').val();
        socket.emit('chat message', myAnswer);
        $('#m').val('');
        return false;
        //TODO: Block the screen with a div
    });
    
    socket.on('newQuestion', function(){
        // TODO - raise the curtain, increment question #
    })

})


