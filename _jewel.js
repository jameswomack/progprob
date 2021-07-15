const console = require('console');
const yargsParser = require('yargs-parser');

/**
 * Returns a filled in board such that there are no 3 consecutive   
 * jewels (vertically/horizontally) of the same type.
 *
 * @param widthOfBoard int which provides width of board
 * @param heightOfBoard int which provides height of board
 * @param jewels array providing valid jewels for board
 */
function generateBoard(widthOfBoard = 6, heightOfBoard = 4, jewels = ['a','b','c','d','e','f']) {  
  const totalNumberOfJewels = widthOfBoard * heightOfBoard;
  let jewelCounter = 0;
  
  const getRandomJewel = (_jewels = jewels) => {
    const jewelIndex = Math.floor(Math.random() * _jewels.length);
    const jewelForPoint = _jewels[jewelIndex];
    
    return jewelForPoint;
  };
    
  let rowIndex = 0;
  let columnIndex = 0;

  const columns = {};
  const rows = {};
  
  while (jewelCounter < totalNumberOfJewels) {
    let randomJewel = getRandomJewel();

    columns[columnIndex] = columns[columnIndex] || new Array();
    rows[rowIndex]       = rows[rowIndex]       || new Array();

    const previousTwoInRow    = columnIndex >= 2 ? rows[rowIndex].slice(columnIndex-2,    columnIndex) : [];
    const previousTwoInColumn = rowIndex    >= 2 ? columns[columnIndex].slice(rowIndex-2, rowIndex)    : [];

    if ((previousTwoInRow.length && previousTwoInRow[previousTwoInRow.length-1] === randomJewel && previousTwoInRow[0] === randomJewel) ||
      (previousTwoInColumn.length && previousTwoInColumn[previousTwoInColumn.length-1] === randomJewel && previousTwoInColumn[0] === randomJewel))  
      randomJewel = getRandomJewel(jewels.filter(j => j !== randomJewel));
    
    columns[columnIndex].push(randomJewel);
    rows[rowIndex].push(randomJewel);
    
    jewelCounter++;
    columnIndex++;

    if (columnIndex > widthOfBoard-1) {
      columnIndex = 0;
      rowIndex++;
    }
  }
  
  console.table(rows);
}

const argv = yargsParser(process.argv);
generateBoard(argv.w, argv.h);

