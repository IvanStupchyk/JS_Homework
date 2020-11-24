//task-1

function Animal(name) {
    this.name = name;
    this._foodAmount = 50;
}

Animal.prototype._formatFoodAmount = function () {
    return this._foodAmount + ' гр.';
};

Animal.prototype.dailyNorm = function(amount) {
    if (!arguments.length) return this._formatFoodAmount();

    if (amount < 50 || amount > 500) {
        return 'Недопустимое количество корма.';
    }

    this._foodAmount = amount;
};

Animal.prototype.feed = function() {
        console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
};


function Cat(name) {
    Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function() {
    Animal.prototype.feed.apply(this);
    this.happyCat();
    return this;
};

Cat.prototype.happyCat = function() {
  console.log('Кот доволен ^_^');
};

Cat.prototype.stroke = function() {
    console.log('Гладим кота');
    return this;
};


var barsik = new Cat('Барсик');

console.log(barsik.name);

console.log(barsik.dailyNorm());
console.log(barsik.feed());

console.log(barsik.dailyNorm(600));
console.log(barsik.feed());

console.log(barsik.dailyNorm(250));
console.log(barsik.feed());
console.log(barsik.stroke().stroke().stroke());

barsik = null;

//task-2

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

function deepClone(initialObj) {
    var cloneObjectOrArray;

    if (!(Array.isArray(initialObj)) && !(typeof(initialObj) === 'object' && !initialObj.length)) {
        cloneObjectOrArray = initialObj;
    }

    else if (typeof(initialObj) === 'object' && !initialObj.length) {
        cloneObjectOrArray = {};
    }

    else if (Array.isArray(initialObj)) {
        cloneObjectOrArray = [];
    }

    for (var key in initialObj) {
        if (typeof(initialObj[key]) === 'object' && initialObj[key] !== null) {
            deepClone(initialObj[key]);
            cloneObjectOrArray[key] = deepClone(initialObj[key]);
        } 
        else {
            cloneObjectOrArray[key] = initialObj[key];
        }
    }

    return cloneObjectOrArray;
}

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);
clonedObj.number = 15;
clonedObj.array[1] = 43;

console.log(initialObj);
console.log(clonedObj);

//task-3

var obj1 = {
    name: 'Re',
    laest: 'Tr', 
    lt: 'Ir',
    boolean: true,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object33: {}
    },
    method: function() {
    alert('Hello');
    }
};

var obj2 = {
    name: 'Re',
    laest: 'Tr', 
    lt: 'Ir',
    boolean: true,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object33: {}
    },
    method: function() {
    alert('Hello');
    }
};

function objectСomparison(obj1, obj2) {

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (var key in obj1) {
        if (typeof(obj1[key]) === 'function') {       
            if (obj1[key].toString() !== obj2[key].toString()) {
                return false;
            }
        }
        else if (typeof(obj1[key]) === 'object' && obj1[key] !== null) {
            if ( !objectСomparison(obj1[key], obj2[key])) {
                return false;
            }
        }
        else if (obj1[key] !== obj2[key]) {
            return false; 
        }
    }

    return true;
}

objectСomparison(obj1, obj2);