/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//setInterval(function(){loadinfo(5)},5000)

// When running on WIFI network @ home
var socketServer = 'localhost'

// When running on Razri phone hotspot
//var socketServer = '192.168.43.44'

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
        //$('#messages').append('<li>' + data.message + '</li>');
        console.log("Socket connection successful")
        socket.emit('i am client', {
            data: 'foo!'
        });
    });


    socket.on('chat message', function (data) {
        //console.log(data);
//        mymessage = {
//            header: data.header,
//            msg: data.msg    
//        }
        addAnswer(data)
        //alert(JSON.stringify(myNewMsg))
    });
    socket.on('error', function () {
        console.error(arguments)
    });
    socket.on('message', function () {
        console.log(arguments)
    });

    $('form').submit(function () {
        socket.emit('chat message', $('#teamname').val() + " answered: " + $('#m').val());
        $('#m').val('');
        return false;
    });

})


// Add a message recieved over socket connection to the top of the list
function addTheMessage(data) {
    console.log("Adding elements from: " + JSON.stringify(data));
    $('<div data-role="collapsible" style="display: none"><h3>' + data.timestamp.substring(0, 19) + ' - ' + data.Comment + '</h3><p>' +
            '<strong>Date/Time: </strong>' + data.timestamp + '<br>' +
            '<strong>Sensor ID: </strong>' + data.SensorID + '<br>' +
            '<strong>Event Type: </strong>' + data.EventType + '<br>' +
            '<strong>Sensor Value: </strong>' + data.EventDescription + '<br>' +
            '</p></div>').prependTo("#answers")
    $('#content').find('div[data-role=collapsible]').collapsible({
        refresh: true
    });
    $('#content').find('div[style="display: none"]').show('slow')
}


function addAnswer(data) {
    console.log("Adding elements from: " + JSON.stringify(data));
    $('<div data-role="collapsible"><h3>' + data + '</h3><p>' +
            '<strong>Date/Time: </strong>' + data + '<br>' +
            '<strong>Sensor ID: </strong>' + data + '<br>' +
            '<strong>Event Type: </strong>' + data + '<br>' +
            '<strong>Sensor Value: </strong>' + data + '<br>' +
            '</p></div>').prependTo("#answers")
    $('#content').find('div[data-role=collapsible]').collapsible({
        refresh: true
    });
    //$('#content').find('div[style="display: none"]').show('slow')
}