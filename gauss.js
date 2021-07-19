function getSummation (contiguousEvenCollectionOfIntegers) {
  const {length} = contiguousEvenCollectionOfIntegers;
  const half = length/2;
  return (contiguousEvenCollectionOfIntegers[0] + contiguousEvenCollectionOfIntegers[length-1]) * half;
}

function getSummationBetween (start, end) {
  const length = 1 + (end - start);
  const half = length/2;
  return (start + end) * half;
}

console.log(getSummation([1,2,3,4,5,6,7,8]));
console.log(getSummationBetween(1,8));