/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//setInterval(function(){loadinfo(5)},5000)

// When running on WIFI network @ home
var socketServer = window.location.hostname;

$(document).ready(function () {
    //loadinfo(10);
    var socket = io.connect('//' + socketServer + ':3000/');

    socket.on('welcome', function (data) {
        console.log("Socket connection successful")
        
    });

    socket.on('error', function () {
        console.error(arguments)
    });
    socket.on('message', function (data) {
        console.log(JSON.stringify(data))
    });
    
    socket.on('NextPicture', function(data){
        console.log("Server sent next picture command (now at picture#: "+data.PictureNumber+")")
        
        var picUrl = "images/picture_round/pic_" + data.PictureNumber + ".jpg"
        console.log("Pic to load: " + picUrl);
        //TODO: Dynamically load pic into a full screen div (blank out the prev pic first)
        $('#imgcontainer').empty();
        loadImage(picUrl, '#imgcontainer')
    })
    
    function loadImage(path, target) {
    $('<img src="'+ path +'" class="img-responsive">').load(function() {
      $(this).appendTo(target);
    });
    }
   
   
})


