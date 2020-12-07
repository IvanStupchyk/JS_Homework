var addRow = document.getElementById('addNewRow'),
    table = document.getElementsByTagName('tbody'),
    tableEl = table[0];


tableEl.addEventListener('click', function (event) {
    var target = event.target;

    if (target.textContent == 'ADD ROW') {
        var trNew = document.createElement('tr');
        trNew.innerHTML = '<td></td><td></td><td></td>';
        tableEl.insertBefore(trNew, tableEl.firstElementChild);
    }

    if (target.tagName == 'TD' && target.textContent != 'ADD ROW') {
        var input = '<input type = "text">';
        
        
        target.innerHTML = input;
        // inputTag.value = target.textContent;
        var inputTag = target.firstElementChild;
        inputTag.focus();
    }

    inputTag.onblur = function () {
        target.innerHTML = inputTag.value;
    }
    
    inputTag.addEventListener('keydown', function (event) {
        var target = event.target;

        if (event.keyCode === 13) {
            target.textContent = inputTag.value;
            inputTag.blur();
        }
    });
});






