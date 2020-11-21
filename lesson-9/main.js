function Animal(name) {
    var self = this;

    self.name = name;
    var foodAmount = 50;

    function formatFoodAmount() {
        return self.foodAmount + ' гр.';
    }

    self.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 50 || amount > 500) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    self.feed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
        
        return self;
    };
}

function Cat() {
    Animal.apply(this, arguments);

    var animalFeed = this.feed;  
    this.feed = function() {
        animalFeed();
        this.happyCat();
    };
    
    this.happyCat = function() {
      console.log('Кот доволен ^_^');
    };

    this.stroke = function() {
        console.log('Гладим кота');

        return this;
    };
}


var barsik = new Cat('Барсик');

console.log(barsik.name);

console.log(barsik.dailyNorm());
console.log(barsik.feed());

console.log(barsik.dailyNorm(600));
console.log(barsik.feed());

console.log(barsik.dailyNorm(250));
console.log(barsik.feed());
console.log(barsik.stroke().feed());

barsik = null;