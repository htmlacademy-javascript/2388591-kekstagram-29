/*function getStringLength (string, maxLength) {
  return string.length <= maxLength;
}*/
const getStringLength = (string, maxLength) => string.length <= maxLength;
console.log('Task #1');
console.log(getStringLength('проверяемая строка', 20));
//console.log(getStringLength('проверяемая строка', 18));
//console.log(getStringLength('проверяемая строка', 10));


function isPolindrom (string) {
  let reversedString = '';
  /*if(string.includes(' ')) {
    reversedString = string.replace(/\s/g, '').split("").reverse().join("");
  }*/
  reversedString = string.split("").reverse().join("");
  return string === reversedString;

}
console.log('Task #2');
console.log(isPolindrom('топот'));
console.log(isPolindrom('keks'));
