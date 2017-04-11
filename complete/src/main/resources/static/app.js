var stompClient = null;
var count = 1;
var rawSocket = null

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        var headers = {};
//        var headers = {ack: 'client', 'selector': 'name:leo'};
        stompClient.subscribe('/topic/greetings', function (greeting) {
            console.log('received from topic')
            showGreeting(JSON.parse(greeting.body).content);
        }, headers);
        stompClient.subscribe('/queue/greetings', function(greeting) {
            console.log('received from queue')
            showGreeting(JSON.parse(greeting.body).content)
        });
        stompClient.subscribe('/app/greetings', function(greeting) {
            console.log('received from app')
            showGreeting(JSON.parse(greeting.body).content)
        });
    });
}

function rawConnect() {
    rawSocket = new SockJS('http://10.71.126.195:8080/raw-greeting')
    rawSocket.onmessage = function(e) {
        console.log('message', e.data)
        showGreeting(e.data)
    }
    rawSocket.onopen = function() {
        console.log('raw socket opened')
    }

}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello/" + count, {}, JSON.stringify({'name': $("#name").val()}));
    count+=1;
}

function rawSendName() {
    rawSocket.send(JSON.stringify({'name': $("#name").val()}));
    count+=1;
}

function showGreeting(message) {
    console.log('print: ' + message)
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#send" ).click(function() { sendName() });
    $( "#disconnect" ).click(function() { disconnect(); });
});

