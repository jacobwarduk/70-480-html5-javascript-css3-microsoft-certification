
$(document).ready(function () {
    $('#btnSnapshot').on('click', drawVideoFrame);
});

function drawVideoFrame() {
    var canvas = document.getElementById('myCanvas');
    var video = document.getElementById('myVideo');
    canvas.getContext('2d').drawImage(video, 0, 0, 360, 240);
}