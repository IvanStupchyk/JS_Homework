// task-1

function changeArr(names) {
    return names.map(function(item) {
        return item = { name: item };
    });
}
      
changeArr(['Vasia', 'Petia']);


// task-2

function currentTime(arr) {
    return arr.reduce(function(previousValue, currentItem, index) {
        return 'Текущее время: ' + arr[index - 2] + ' : ' + arr[index - 1] + ' : ' + arr[index] ;
    });
}
     
currentTime(['00', '13', '24']);


// task-3

function amountVowels (line) {
    var strArr = line.split(''), 
        vowels = "аеёиоуыэюя";
 
    return strArr.reduce(function(sum, val) {
       if (vowels.indexOf(val) !== -1) { 
            sum++; 
       }
       return sum; 
    }, 0); 
}

amountVowels('ывваё');


// task-4 

function countingLetters(line) {
    var arr = line.split(/[.!?]+/);

    var amountLetters = arr.map(function(item, i) {
        var arrLetters = item.toLowerCase().split(''),
            vowels = "йцукенгшщзхъфывапролджэячсмитьбю";

        return arrLetters.reduce(function(sum, val) {
            if (vowels.indexOf(val) !== -1) { 
                sum++; 
            }
            return sum; 
        }, 0); 
    });

    console.log(arr[0] + ': Letters quantity is: ' + amountLetters[0]);
    console.log(arr[1].trim() + ': Letters quantity is: ' + amountLetters[1]);
    console.log(arr[2].trim() + ': Letters quantity is: ' + amountLetters[2]);
}
  
countingLetters('Привет, студент! Студент... Как дела, студент?');


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
  
countingLetters('Привет укпукп, во во студент! рис рис рис рис рис Студент... Как дела, студент?');
