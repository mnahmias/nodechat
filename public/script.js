var socket = io.connect('http://localhost');

function addMessage(msg, name) {
   $("#chatEntries").append('<div class="message"><p>' + name + ' : ' + msg + '</p></div>');
}

function sentMessage() {
   if ($('#messageInput').val() != "") 
   {
      socket.emit('message', $('#messageInput').val());
      addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
      $('#messageInput').val('');
   }
}

function setName() {
   if ($("#nameInput").val() != "")
   {
      socket.emit('setName', $("#nameInput").val());
      $('#chatControls').show();
      $('#nameInput').hide();
      $('#nameSet').hide();
   }
}

socket.on('message', function(data) {
   addMessage(data['message'], data['name']);
});

$(function() {
   $("#chatControls").hide();
   $("#nameSet").click(function() {setName()});
   $("#submit").click(function() {sentMessage();});
});