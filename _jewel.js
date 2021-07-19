/* eslint-disable no-console, no-param-reassign */

/**
 * Returns a filled in board such that there are no 3 consecutive   
 * jewels (vertically/horizontally) of the same type.
 *
 * @param widthOfBoard int which provides width of board
 * @param heightOfBoard int which provides height of board
 * @param jewels array providing valid jewels for board
 */
function generateBoard(widthOfBoard = 6, heightOfBoard = 4, jewels = ['a','b','c','d','e','f']) {  
  typeof jewels === 'string' && (jewels = jewels.split(','));

  const totalNumberOfJewels = widthOfBoard * heightOfBoard;
  let currentOverallBoardIndex = 0, currentRowIndex = 0, currentColumnIndex = 0;
  const columns = {}, rows = {};
  
  const getRandomJewel = (_jewels = jewels) => {
    const jewelIndex = Math.floor(Math.random() * _jewels.length);
    return _jewels[jewelIndex];
  };
  
  while (currentOverallBoardIndex < totalNumberOfJewels) {
    let randomJewel = getRandomJewel();

    columns[currentColumnIndex] = columns[currentColumnIndex] || new Array();
    rows[currentRowIndex]       = rows[currentRowIndex]       || new Array();

    const previousTwoInRow    = currentColumnIndex >= 2 ? rows[currentRowIndex].slice(currentColumnIndex-2,    currentColumnIndex) : [];
    const previousTwoInColumn = currentRowIndex    >= 2 ? columns[currentColumnIndex].slice(currentRowIndex-2, currentRowIndex)    : [];

    if ((previousTwoInRow.length && previousTwoInRow[previousTwoInRow.length-1] === randomJewel && previousTwoInRow[0] === randomJewel) ||
      (previousTwoInColumn.length && previousTwoInColumn[previousTwoInColumn.length-1] === randomJewel && previousTwoInColumn[0] === randomJewel))  
      randomJewel = getRandomJewel(jewels.filter(j => j !== randomJewel));
    
    columns[currentColumnIndex].push(randomJewel);
    rows[currentRowIndex].push(randomJewel);
    
    currentOverallBoardIndex++;
    currentColumnIndex++;

    if (currentColumnIndex > widthOfBoard-1) {
      currentColumnIndex = 0;
      currentRowIndex++;
    }
  }
  
  console.table(rows);
}

const {w,h,j} = require('yargs-parser')(process.argv);
generateBoard(w, h, j);