var addRow = document.getElementById('addNewRow'),
    table = document.getElementsByTagName('tbody'),
    tableEl = table[0];

var input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('maxlength', '18');


tableEl.addEventListener('click', function (event) {
    var target = event.target;

    if (target.textContent == 'ADD ROW') {
        var trNew = document.createElement('tr');
        trNew.innerHTML = '<td></td><td></td><td></td>';

        tableEl.insertBefore(trNew, tableEl.firstElementChild);
    }

    if (target.tagName == 'TD' && target.textContent != 'ADD ROW') {
        input.value = target.textContent;
        target.textContent = '';
        target.appendChild(input);
        input.focus();
    }

    input.onblur = function () {
        target.innerHTML = input.value;
    }
});

input.addEventListener('keydown', function (event) {
    var target = event.target;

    if (event.keyCode === 13) {
        target.textContent = input.value;
        input.blur();
    }
});






