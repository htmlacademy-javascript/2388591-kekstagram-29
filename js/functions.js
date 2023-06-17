
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
