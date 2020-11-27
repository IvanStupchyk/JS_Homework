// task-1
function filterNumbersArr(arr) {
    return arr.filter(function(number) {
        return number > 0;
    });
}
  
filterNumbersArr([-1, 0, 2, 77, -1, -2, 4, 13]);
// это если соблюдать именно такой вызов, как был в изначальной функции. Либо упрощенный вариант:

arr = [-1, 0, 2, 77, -1, -2, 4, 13];
filterNumbersArr = arr.filter(function(number) {
    return number > 0;
});

console.log(filterNumbersArr);


// task-2
function filterNumbersArr(arr) {
    return arr.find(function(number) {
        return number > 0;
    });
}
  
filterNumbersArr([-1, 0, 2, 77, -1, -2, 4, 13]);


// task-3
function isPalindrome(word) {
    if (word === word.split('').reverse().join('')) {
        return true;
    }
    
    return false;
}
  
isPalindrome('шалаш'); 
isPalindrome('Петя'); 


// task-4
function areAnagrams(word1, word2) {
    if (word1.split('').sort().join('') === word2.split('').sort().join('')) {
        return true;
    } 

    return false;
}
  
areAnagrams('кот', 'отк'); 
areAnagrams('кот', 'атк'); 
areAnagrams('кот', 'отко');


//task-5
function divideArr(arr, amount) {
    var result = [];

    for (i = 0; i < arr.length; i += amount) {
        result.push(arr.slice(i, i + amount));
    }
  
    return result;
}
  
divideArr([1, 2, 3, 4, 5], 2);
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); 

