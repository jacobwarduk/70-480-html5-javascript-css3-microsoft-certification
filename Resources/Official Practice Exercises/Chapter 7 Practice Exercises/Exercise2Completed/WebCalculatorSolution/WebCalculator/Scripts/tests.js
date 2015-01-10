/// <reference path="_references.js" />
module('Calculator Test Suite', {
    setup: function () {
        calculatorNamespace.initialize();
    }
});

test("Initialize Test", function () {
    expect(2);
    var expected = '0';
    equal($('#txtInput').val(), expected, 'Expected value: ' + expected +
        '  Actual value: ' + $('#txtInput').val());
    equal($('#txtResult').val(), expected, 'Expected value: ' + expected +
        '  Actual value: ' + $('#txtResult').val());
});

test("Button Click Test", function () {
    var buttonQuantity = 10;
    expect(buttonQuantity * 2);
    for (var i = 0; i < buttonQuantity; i++) {
        $('#btnNumber' + i).triggerHandler('click');
        var result = $('#txtInput').val()[$('#txtInput').val().length - 1];
        var expected = String(i);
        equal(result, expected, 'Expected value: ' + expected +
            '  Actual value: ' + result);
        var expectedLength = i < 2 ? 1 : i;
        equal($('#txtInput').val().length, expectedLength,
            'Expected string length: ' + expectedLength +
            '  Actual value: ' + $('#txtInput').val().length);
    }
});

test("Add Test", function () {
    expect(2);
    txtInput.value = '10';
    txtResult.value = '20';
    var btnPlus = document.getElementById('btnPlus');
    QUnit.triggerEvent(btnPlus, "click");
    var expected = '30';
    equal(txtResult.value, expected, 'Expected value: ' + expected +
        '  Actual value: ' + txtResult.value);
    expected = '0';
    equal(txtInput.value, expected, 'Expected value: ' + expected + '  Actual value: ' + txtInput.value);
});

test("Subtract Test", function () {
    expect(2);
    txtInput.value = '10';
    txtResult.value = '20';
    var btnMinus = document.getElementById('btnMinus');
    QUnit.triggerEvent(btnMinus, "click");
    var expected = '10';
    equal(txtResult.value, expected, 'Expected value: ' + expected +
        '  Actual value: ' + txtResult.value);
    expected = '0';
    equal(txtInput.value, expected, 'Expected value: ' + expected + '  Actual value: ' + txtInput.value);
});

test("Clear Entry Test", function () {
    expect(1);
    $('#txtInput').val('10');
    $('#btnClearEntry').triggerHandler('click');
    var expected = '0';
    equal($('#txtInput').val(), expected, 'Expected value: ' + expected +
        '  Actual value: ' + $('#txtInput').val());
});

test("Clear Test", function () {
    expect(2);
    $('#txtInput').val('10');
    $('#txtResult').val('20');
    $('#btnClear').triggerHandler('click');
    var expected = '0';
    equal($('#txtInput').val(), expected, 'Expected value: ' + expected +
        '  Actual value: ' + $('#txtInput').val());
    equal($('#txtResult').val(), expected, 'Expected value: ' + expected +
        '  Actual value: ' + $('#txtResult').val());
});
