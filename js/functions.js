
const getStringLength = (string, maxLength) => string.length <= maxLength;

getStringLength('проверяемая строка', 20);
getStringLength('проверяемая строка', 18);
getStringLength('проверяемая строка', 10);


function isPolindrom (string) {
  let reversedString = '';
  reversedString = string.split("").reverse().join("");
  return string === reversedString;

}


isPolindrom('топот');
