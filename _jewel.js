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
    let previousTwoInRow = [];
    let previousTwoInColumn = [];

    let randomJewel = getRandomJewel();

    columns[columnIndex] = columns[columnIndex] || new Array();
    rows[rowIndex] = rows[rowIndex] || new Array();

    columnIndex >= 2 && (previousTwoInRow    =       rows[rowIndex].slice(columnIndex-2, columnIndex));
    rowIndex    >= 2 && (previousTwoInColumn = columns[columnIndex].slice(rowIndex-2,    rowIndex));

    let jewelToFilter = null;
    if (previousTwoInRow.length && previousTwoInRow.filter(jewel => jewel === randomJewel).length === 2) 
      jewelToFilter = randomJewel;

    if (previousTwoInRow.length) { 
      const filteredPrevious2InRow = previousTwoInRow.filter(jewel => jewel === randomJewel);
      if (filteredPrevious2InRow.length === 2)
        jewelToFilter = randomJewel;
    } 
    
    if (previousTwoInColumn.length) { 
      const filteredPrevious2InColumn = previousTwoInColumn.filter(jewel => jewel === randomJewel);
      if (filteredPrevious2InColumn.length === 2)
        jewelToFilter = randomJewel;
    }    

    jewelToFilter && (randomJewel = getRandomJewel(jewels.filter(j => j !== jewelToFilter)));
    
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

