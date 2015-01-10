$(document).ready(function () {
    $('#btnAdd').on('click', addNumbers)
    $('#btnSubtract').on('click', subtractNumbers)
    $('#btnMultiplication').on('click', multiplyNumbers)
    $('#btnDivision').on('click', divideNumbers)
});

function addNumbers() {
    var data = getFormData();
    serverAddition(data).done(displayResult);
}

function getFormData() {
    var x = $('#x').val();
    var y = $('#y').val();
    return { "x": x, "y": y };
}

function serverAddition(data) {
    return $.getJSON('/addition', data);
}

function displayResult(serverData) {
    $('#result').html(serverData.result);
}

function subtractNumbers() {
    var data = getFormData();
    serverSubtraction(data).done(displayResult);
}

function serverSubtraction(data) {
    return $.post('/subtraction', data, 'json');
}

function multiplyNumbers() {
    var data = getFormData();
    serverMultiplication(data).done(displayResult);
}

function serverMultiplication(data) {
   return $.ajax({
                url: '/multiply',
                data: data,
                type: 'PUT',
                dataType: 'json',
                cache: false
            });
}

function divideNumbers() {
    var data = getFormData();
    serverDivision(data).done(displayResult).fail(displayError);
}

function displayError(serverData, error) {
    var value = 'No result';
    if ('result' in serverData) value = serverData.result;
    $('#result').html(value + ' - ' + error);
}

function serverDivision(data) {
   return $.ajax({
                url: '/divide',
                data: data,
                type: 'DELETE',
                dataType: 'json',
                cache: false
            });
}