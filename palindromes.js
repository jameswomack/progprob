const console = require('console');

/* Begin core functionality */
const getArraySansIndex = (a, _index) => a.filter((item, index) => index !== _index);

function doesStringContainPalindrome (string) {
  const array = string.split('');

  const reversed = [...array].reverse().join('');
  const forward = array.join('');
  if (reversed == forward) {
    console.info(reversed, forward);
    return true;
  }

  let countBound = array.length;
  let currentIndex = 0;

  while (currentIndex < countBound) {
    const arraySansIndex = getArraySansIndex(array, currentIndex);

    const reversed = [...arraySansIndex].reverse().join('');
    const forward = arraySansIndex.join('');
    if (reversed == forward) {
      console.info(reversed, forward);
      return true;
    }
    
    currentIndex++;
  }

  return false;
}
/* End core functionality */

/* Begin functionality usage & verification */
let result;
result = doesStringContainPalindrome('racecar');
console.info(result); // => true
result = doesStringContainPalindrome('rbacecar');
console.info(result); // => true
result = doesStringContainPalindrome('racecarb');
console.info(result); // => true
result = doesStringContainPalindrome('racecae');
console.info(result); // => false
/* End functionality usage & verification */
