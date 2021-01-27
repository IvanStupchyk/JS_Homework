//task-1
{
let {a, b, ...obj} = {a: 1, b: 2, c: 3, d: 4};
}


//task-2
{
let {name} = {name: prompt()};

let obj = {
    name,

    sayHi() {
        return `Hi, ${obj.name}!`;
    }
}

obj.sayHi();
}


//task-3
{
const func = (obj, z = 1) => {
    let {a: x, b: y} = obj;

    return x**y * z;
}

func({a: 2, b: 3}, 2);
}


//task-4
{
let arr = ['Andrey', 40];

const func = (name, age) => {
    return `Hello, I'm ${name} and I'm ${age} years old.`;
}

func(...arr);
}


//task-5
{
const func = (...arr) => {
    for (let i of arr) {
        console.log(i);
    }
}

func(1, 1, 2, 3, 5, 8, 13);
}


//task-6
{
const countVowelLetters = text => {
    text = text.toLowerCase().split('');

    const vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'];
    let counter = 0;

    text.forEach( i => {
        vowelLetters.forEach( j => {
            i === j && counter++;
        });
    });

    return counter;
}

countVowelLetters('Шла Саша по шоссе И сосала сУшку');
}

