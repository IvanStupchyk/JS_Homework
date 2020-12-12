var inputX = document.getElementById('inputX'),
    inputY = document.getElementById('inputY'),
    btnCreate = document.getElementsByTagName('button')[0],
    ul = document.getElementsByTagName('ul')[0];

var chessBoard = document.createElement("table");

ul.addEventListener('keyup', function (event) {

    if (inputX.value.trim() != '' && inputY.value.trim() != '') {
        btnCreate.removeAttribute('disabled');
    }
    
    if (inputX.value == '' || inputY.value == '') {
        btnCreate.setAttribute('disabled', 'disabled');
    }
});

btnCreate.addEventListener('click', function (event) {

    if (document.body.lastElementChild == chessBoard) {
        chessBoard.innerHTML = '';
        document.body.removeChild(chessBoard);
    }

    if (!(+inputX.value >= 1 && +inputX.value <= 10 && +inputX.value === parseInt(+inputX.value, 10))) {
        alert('Введите в поле X целое число от 1 до 10');
        btnCreate.setAttribute('disabled', 'disabled');
        inputX.value = '';
    }

    if (!(+inputY.value >= 1 && +inputY.value <= 10 && +inputY.value === parseInt(+inputY.value, 10))) {
        alert('Введите в поле Y целое число от 1 до 10');
        btnCreate.setAttribute('disabled', 'disabled');
        inputY.value = '';
    }

    if ((+inputX.value >= 1 && +inputX.value <= 10 && +inputX.value === parseInt(+inputX.value, 10)) && (+inputY.value >= 1 && +inputY.value <= 10 && +inputY.value === parseInt(+inputY.value, 10))) {

        for (var i = 1; i <= +inputY.value; i++) {
            var tr = document.createElement('tr');

            for (var j = 1; j <= +inputX.value; j++) {
                var td = document.createElement('td');

                if (i % 2 == j % 2) {
                    td.className = "black";
                }

                tr.appendChild(td);
            }

            chessBoard.appendChild(tr);
            document.body.appendChild(chessBoard);
        }
        btnCreate.setAttribute('disabled', 'disabled');
        inputY.value = '';
        inputX.value = '';
    }
});

chessBoard.addEventListener('click', function (event) {
    var target = event.target;
    var tdCollection = chessBoard.getElementsByTagName('td');
    
    if (target.tagName == 'TD') {
        for (i = 0; i < tdCollection.length; i++) {
            tdCollection[i].classList.toggle('black');
        }
    }
});
/* Можно было цикл запустить просто при клике на chessBoard,
но в лекции вы говорили, что надо повесить именно на ячейки */