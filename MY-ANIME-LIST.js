const Sheet = SpreadsheetApp.getActiveSpreadsheet();
const shtInputMAL = Sheet.getSheetByName('Input MY ANIME LIST');
const shtMAL = Sheet.getSheetByName('MY ANIME LIST');

function saveAnime() {
  
  const rawData = shtInputMAL.getRange('E5:E41').getValues();

  const animeTitle = rawData[0][0]; //E5
  const type = rawData[2][0]; //E7
  const source = rawData[4][0]; //E9
  const studios = rawData[6][0]; //E11
  const premiered = rawData[8][0]; //E13
  const releaseDateBegin = rawData[10][0]; //E15
  const releaseDateEnd = rawData[12][0]; //E17
  const epsCount = rawData[14][0]; //E19
  const durationPerMinute = rawData[16][0]; //E21
  const genre = rawData[18][0]; //E23
  const demographic = rawData[20][0]; //E25
  const watchStatus = rawData[22][0]; //E27
  const progress = rawData[24][0]; //E29
  const personalRating = rawData[26][0]; //E31
  const legalIllegal = rawData[28][0]; //E33
  const platform = rawData[30][0]; //E35
  const description = rawData[32][0]; //E37
  const opensong = rawData[34][0]; //E39
  const endsong = rawData[36][0]; //E42

  let row = shtMAL.getRange('V3').getValue();
  row += 3;

  const ccontentRRangeMAL1 = shtMAL.getRange('B' + row + ':H' + row);
  const ccontentRRangeMAL2 = shtMAL.getRange('J' + row + ':U' + row);
  
  ccontentRRangeMAL1.setValues([[animeTitle,type,source,studios,premiered,releaseDateBegin,releaseDateEnd]]);
  ccontentRRangeMAL2.setValues([[epsCount,durationPerMinute,genre,demographic,watchStatus,progress,personalRating,legalIllegal,platform,description,opensong,endsong]]);

  const rangeSorting = shtMAL.getRange('B3:U' + row);
  rangeSorting.sort({column: 2, ascending: true});

  clearMAL();
};

function clearMAL() {
  let cellsToClear = ['E5', 'E7', 'E9', 'E11', 'E13', 'E15', 'E17', 'E19', 'E21', 'E23', 'E25', 'E27', 'E29', 'E31', 'E33', 'E35', 'E37', 'E39', 'E41'];
  shtInputMAL.getRangeList(cellsToClear).clearContent();
  shtInputMAL.getRange('E21').setValue('23 min.');
};