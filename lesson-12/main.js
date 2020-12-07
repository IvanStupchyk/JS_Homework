// task-1

function changeArr(names) {
    return names.map(function(item) {
        return { name: item };
    });
}
      
changeArr(['Vasia', 'Petia']);


// task-2

function currentTime(arr) {
    return arr.reduce(function(previousValue, currentItem) {
        return previousValue + ' : ' + currentItem;
    },'Текущее время');
}
     
currentTime(['00', '13', '24']);


// task-3

function amountVowels(line) {
    var strArr = line.split(''), 
        vowels = "аеёиоуыэюя",
        sum = 0;

    strArr.forEach(function(item, i) {
       if (vowels.indexOf(item) !== -1) { 
            sum += 1;  
       }
    }); 

    return sum;
}

amountVowels('ывваё');

// task-4 

function countingLetters(line) {
    var arr = line.split(/[.!?]+/);

    var amountLetters = arr.map(function(item, i) {
        var arrLetters = item.toLowerCase().split(''),
            vowels = "йцукенгшщзхъфывапролджэячсмитьбю",
            sum = 0;
         
        arrLetters.forEach(function(item, i) {
            if (vowels.indexOf(item) !== -1) { 
                sum += 1; 
            }            
        });

        return sum; 
    });

    arr.forEach(function(item, i) {
        console.log(arr[i].trim() + ': Letters quantity is: ' + amountLetters[i]);
    });
}
  
countingLetters('Привет, студент! Студент... Как дела, студент');


// task-5

function wordCount(line) {
    var arr = line.toLowerCase().split(/[.!?, ]+/);
  
    var result = {};
    arr.forEach(function(a) {
        result[a] = result[a] + 1 || 1;
    });

    var arrNumbers = Object.values(result).sort();
  
    for (var key in result) {
        if ( arrNumbers[arrNumbers.length - 1] === result[key]) {
            return 'Максимальное число повторений у слова ' + key +': ' + arrNumbers[arrNumbers.length - 1];
        } 
    }
}
  
wordCount('Привет укпукп, во во студент! рис рис рис рис рис Студент... Как дела, студент?');
