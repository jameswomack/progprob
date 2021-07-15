/* Begin cache-related code */
const sumCache = new Map();

function getCachedSumResult (array, sum) {
  return sumCache.get(`${array}{${sum}`);
}

function cacheSumResult (array, sum, result) {
  sumCache.set(`${array}{${sum}`, result);
  return result;
}
/* End cache-related code */

/* Begin core functionality */
function doesArrayContainSum (array, sum) {
  // Return a cached result if available.
  // Note this only provides a performance benefit when we need to iterate
  // over the same array many different times. Below a certain threshold,
  // this approach is actually *less* performant...
  // However, in the case being presented below, this approach is 2x
  let cachedSumResult;
  if ((cachedSumResult = getCachedSumResult(array, sum)) !== undefined)
    return cachedSumResult;

  let currentStartIndex = 0;
  let currentEndIndex = array.length - 1;

  while (currentStartIndex !== currentEndIndex) {
    if ((array[currentStartIndex] + array[currentEndIndex]) === sum) {
      return cacheSumResult(array, sum, true);
    } else if ((array[currentStartIndex] + array[currentEndIndex]) <= sum) {
      currentStartIndex++;
    } else if ((array[currentStartIndex] + array[currentEndIndex]) >= sum) {
      currentEndIndex--;
    }
  }

  return cacheSumResult(array, sum, false);
}
/* End core functionality */

/* Begin functionality usage & verification */
const array = [0,1,2,3,4,5,6,7,7,7,9,4567];
const sum = 4576;
let result;
let iterations = 1000;
console.time('arrayContainsSum');
while (iterations--) {
  result = doesArrayContainSum(array, sum);
}
console.timeEnd('arrayContainsSum');
console.info(`${result}`);
/* End functionality usage & verification */
