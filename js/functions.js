
const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);


function isPalindrome (string) {
  let reversedString = '';
  string = string.toLowerCase().replace(/\s/g, '');
  reversedString = string.split('').reverse().join('');
  return string === reversedString;

}

isPalindrome('топот');
isPalindrome('Лёша на полке клопа нашёл');

const getIntegerFromString = (string) => {
  string = typeof string === Number ? String(string) : string;
  string = string.replace(/\D/g, '');
  return string.length > 0 ? parseInt(string, 10) : NaN;
};

getIntegerFromString('esmi8r5.4a');
getIntegerFromString('2023 год');
getIntegerFromString('ECMAScript 2022');
getIntegerFromString('1 кефир, 0.5 батона');
getIntegerFromString('агент 007');
getIntegerFromString('а я томат');

