var container = document.getElementById('container');
var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');


firstPar.innerHTML = 'Hello, here are <a href ="https://www.facebook.com">Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href ="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

var btnCollection = document.getElementsByTagName('button');
    btn = btnCollection[0];

btn.addEventListener('click', function (evt) {
    for (var i = 0; i < firstPar.children.length; i++) {
        firstPar.children[i].classList.add('color-link');
    }
}); 

localStorage.clear();

secondPar.addEventListener('click', function (event) {
    var target = event.target;
    event.preventDefault();
    if (target.tagName == 'A') {
        if (localStorage.getItem(target.textContent) != null) {
            var parseObject = JSON.parse(localStorage.getItem(target.textContent)),
                objectValue = parseObject['path'];
            alert(objectValue);
        }

        else if (localStorage.getItem(target.textContent) === null) {
            alert('Информация об объекте сохранена');
            localStorage.setItem(target.textContent, JSON.stringify({ path: target.getAttribute('href')}));
            target.setAttribute('href', '#'); 
        }
    }
}); 

