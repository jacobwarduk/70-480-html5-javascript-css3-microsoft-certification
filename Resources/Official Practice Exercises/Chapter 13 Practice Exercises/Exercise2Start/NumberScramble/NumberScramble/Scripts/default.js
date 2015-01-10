/// <reference path="jquery-1.8.3.js" />

var squareCount = 16
var emptySquare;

$(document).ready(function () {
    jQuery.event.props.push('dataTransfer');
    createBoard();
    addTiles();
});

function createBoard() {
    for (var i = 0; i < squareCount; i++) {
        var $square = $('<div id="square' + i + '" data-square="' + i
            + '"  class="square"></div>');
        $square.appendTo($('#gameBoard'));
    }
}

function addTiles() {
    emptySquare = squareCount - 1;
    for (var i = 0; i < emptySquare; i++) {
        var $square = $('#square' + i);
        var $tile = $('<div draggable="true" id="tile' + i
            + '" class="tile">' + (i + 1) + '</div>');
        $tile.appendTo($square);
    }
}
