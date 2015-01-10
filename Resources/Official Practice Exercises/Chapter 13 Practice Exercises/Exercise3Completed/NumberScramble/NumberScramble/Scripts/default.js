/// <reference path="jquery-1.8.3.js" />

var squareCount = 16
var emptySquare;

$(document).ready(function () {
    jQuery.event.props.push('dataTransfer');
    createBoard();
    addTiles();
    $('#gameBoard').on('dragstart', dragStarted);
    $('#gameBoard').on('dragend', dragEnded);
    $('#gameBoard').on('dragenter', preventDefault);
    $('#gameBoard').on('dragover', preventDefault);
    $('#gameBoard').on('drop', drop);
    scramble();
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

function dragStarted(e) {
    var $tile = $(e.target)
    $tile.addClass('dragged');
    var sourceLocation = $tile.parent().data('square');
    e.dataTransfer.setData('text', sourceLocation.toString());
    e.dataTransfer.effectAllowed = 'move';
}

function dragEnded(e) {
    $(e.target).removeClass('dragged');
}

function preventDefault(e) {
    e.preventDefault();
}

function drop(e) {
    var $square = $(e.target);
    if ($square.hasClass('square')) {
        var destinationLocation = $square.data('square');
        if (emptySquare != destinationLocation) return;
        var sourceLocation = Number(e.dataTransfer.getData('text'));
        moveTile(sourceLocation);
        checkForWinner();
    }
}

function moveTile(sourceLocation) {
    var distance = sourceLocation - emptySquare;
    if (distance < 0) distance = -(distance);
    if (distance == 1 || distance == 4) {
        swapTileAndEmptySquare(sourceLocation);
    }
}

function swapTileAndEmptySquare(sourceLocation) {
    var $draggedItem = $('#square' + sourceLocation).children();
    $draggedItem.detach();
    var $target = $('#square' + emptySquare);
    $draggedItem.appendTo($target);
    emptySquare = sourceLocation;
}

function scramble() {
    for (var i = 0; i < 128; i++) {
        var random = Math.random()
        var sourceLocation;
        if (random < 0.5) {
            var column = emptySquare % 4
            if (column == 0 || (random < 0.25 && column != 3)) {
                sourceLocation = emptySquare + 1;
            }
            else {
                sourceLocation = emptySquare - 1;
            }
        }
        else {
            var row = Math.floor(emptySquare / 4)
            if (row == 0 || (random < 0.75 && row != 3)) {
                sourceLocation = emptySquare + 4;
            }
            else {
                sourceLocation = emptySquare - 4;
            }
        }
        swapTileAndEmptySquare(sourceLocation);
    }
}

function checkForWinner() {
    if (emptySquare != squareCount - 1) return;
    for (var i = 0; i < emptySquare; i++) {
        if ($('#tile' + i).parent().attr('id') != 'square' + i) return;
    }
    $('#message').html('Winner!');
}

