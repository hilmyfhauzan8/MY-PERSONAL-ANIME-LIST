const Sheet = SpreadsheetApp.getActiveSpreadsheet();
const shtInputMAL = Sheet.getSheetByName('Input');
const shtMAL = Sheet.getSheetByName('MY ANIME LIST');

function SaveAnime() {
  
  const rawData = shtInputMAL.getRange('E5:E41').getValues();

  const animeTitle = rawData[0][0]; //E5
  const type = rawData[2][0]; //E7
  const source = rawData[4][0]; //E9
  const studio = rawData[6][0]; //E11
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
  const platform =rawData[12][0]; //E17
  const description = rawData[18][0]; //E23
  const opensong = rawData[20][0]; //E25
  const endsong = rawData[22][0]; //E27

  let row = shtMAL.getRange('O3').getValue();
  row += 3;
  const rangeIsiMAL1 = shtMAL.getRange('B' + row + ':D'+ row);
  const rangeIsiMAL2 = shtMAL.getRange('F' + row + ':N'+ row);
  
  rangeIsiMAL1.setValues([[animetitle,rdbegin,rdend]]);
  rangeIsiMAL2.setValues([[epscount,genre,watchsts,eps,legal,platform,description,opensong,endsong]]);

  const rangeSorting = shtMAL.getRange('B3:N' + row);
  rangeSorting.sort({column: 2, ascending: true});

  ClearMAL();
};

function ClearMAL() {
  let cellsToClear = ['E5', 'E7', 'E9', 'E11', 'E13', 'E15', 'E17', 'E19', 'E21', 'E23', 'E25', 'E27'];
  shtInputMAL.getRangeList(cellsToClear).clearContent();
  // shtInputMAL.getRange('E17').setValue('Eps. ');
};