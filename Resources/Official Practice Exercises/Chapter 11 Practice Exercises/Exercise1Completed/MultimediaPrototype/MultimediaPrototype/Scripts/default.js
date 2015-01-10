/// <reference path="jquery-1.8.3.js" />
$(document).ready(function () {
    $('#media').on('play', function () {
        $('#message').html($('#media')[0].currentSrc);
    });
});