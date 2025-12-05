
const Sheet = SpreadsheetApp.getActiveSpreadsheet();
const shtInputMAL = Sheet.getSheetByName('Input MY PERSONAL ANIME LIST');
const shtMAL = Sheet.getSheetByName('MY PERSONAL ANIME LIST');

function saveAnime() {

  const rawData = shtInputMAL.getRange('E5:E55').getValues();

  const animeTitle = rawData[0][0];           //E5
  const animeTitleJapanese = rawData[2][0];   //E7
  const animeTitleEnglish = rawData[4][0];    //E9
  const animeTitleSynonym = rawData[6][0];    //E11
  const imageURL = rawData[8][0];             //E13
  const type = rawData[10][0];                //E15
  const source = rawData[12][0];              //E17
  const studios = rawData[14][0];             //E19
  const premiered = rawData[16][0];           //E21
  const releaseDateBegin = rawData[18][0];    //E23
  const releaseDateEnd = rawData[20][0];      //E25
  const episodeCount = rawData[22][0];        //E27
  const durationPerEpisode = rawData[24][0];  //E29
  const genres = rawData[26][0];              //E31
  const themes = rawData[28][0];              //E33
  const demographics = rawData[30][0];        //E35
  const rating = rawData[32][0];              //E37
  const score = rawData[34][0];               //E39
  const watchStatus = rawData[36][0];         //E41
  const progress = rawData[38][0];            //E43
  const personalScore = rawData[40][0];       //E45
  const legalIllegal = rawData[42][0];        //E47
  const platform = rawData[44][0];            //E49
  const description = rawData[46][0];         //E51
  const opensong = rawData[48][0];            //E53
  const endsong = rawData[50][0];             //E55
  
  let row = shtMAL.getRange('AD3').getValue();
  row += 3;

  const formulaImage = '=IMAGE(F' + row + ', 3)'
  const formulaReleaseDate = '=TEXTJOIN("  -  ", true, L' + row + ',M' + row +')'
  const formulaProgress = '=IF(REGEXMATCH(V' + row + ',"^Complete"), "✅", IF(V' + row + '="Watch Later", "🔄", IF(V' + row + '="Watching","🟣", IF(V' + row + '="Drop", "❌", ""))))';
  const finalProgress = (progress === "") ? formulaProgress : progress;

  const contentRRangeMAL = shtMAL.getRange('B' + row + ':AC' + row);
  contentRRangeMAL.setValues([[animeTitle,animeTitleJapanese,animeTitleEnglish,animeTitleSynonym,imageURL,formulaImage,type,source,studios,premiered,releaseDateBegin,releaseDateEnd,formulaReleaseDate,episodeCount,durationPerEpisode,genres,themes,demographics,rating,score,watchStatus,finalProgress,personalScore,legalIllegal,platform,description,opensong,endsong]]);
  
  const rangeSorting = shtMAL.getRange('B3:AC' + row);
  rangeSorting.sort({column: 2, ascending: true});

  // const finder = shtMAL.getRange("B3:B" + row).createTextFinder(animeTitle).matchEntireCell(true);
  // const result = finder.findNext();
  // if (result) {shtMAL.setRowHeight(result.getRow(), 350)};

  clearInputMAL();
};

// =================================================================================================================================================

function clearInputMAL() {
  let cellsToClear = ['E5', 'E7', 'E9', 'E11', 'E13', 'E15', 'E17', 'E19', 'E21', 'E23', 'E25', 'E27', 'E29', 'E31', 'E33', 'E35', 'E37', 'E39', 'E41', 'E43', 'E45', 'E47', 'E49', 'E51', 'E53', 'E55'];
  shtInputMAL.getRangeList(cellsToClear).clearContent();
};

// =================================================================================================================================================

function searchAnimeInfo() {
  
  const query = shtInputMAL.getRange('E5').getValue();
  
  if (query === "") {
    Browser.msgBox("Silakan masukkan Judul Anime terlebih dahulu.");
    return;
  }

  const url = 'https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(query) + '&limit=1';

  try {
    const json = JSON.parse(UrlFetchApp.fetch(url).getContentText());

    if (!json.data || json.data.length === 0) {
      Browser.msgBox("Anime tidak ditemukan!");
      return;
    }

    const anime = json.data[0];
    const animeTitleJapaneseAI = anime.title_japanese || "-";
    const animeTitleEnglishAI = anime.title_english || "-";
    const animeTitleSynonymAI = anime.title_synonyms || "-";
    const imageURLAI = anime.images.jpg.image_url || "-";
    const typeAI = anime.type || "-";
    const sourceAI = anime.source || "-";
    const studiosAI = anime.studios.map(s => s.name).join(', ') || "-";
    const premieredAI = (anime.season && anime.year) ? 
                      (anime.season.charAt(0).toUpperCase() + anime.season.slice(1) + " " + anime.year) : "-";
    let releaseDateBeginAI = "";
    if (anime.aired.prop.from.day && anime.aired.prop.from.month && anime.aired.prop.from.year) {
      releaseDateBeginAI = new Date(anime.aired.prop.from.year, anime.aired.prop.from.month - 1, anime.aired.prop.from.day + 1);
    }
    let releaseDateEndAI = "";
    if (anime.aired.prop.to.day && anime.aired.prop.to.month && anime.aired.prop.to.year) {
      releaseDateEndAI = new Date(anime.aired.prop.to.year, anime.aired.prop.to.month - 1, anime.aired.prop.to.day + 1);
    }
    const episodeCountAI = anime.episodes || "?";
    const durationPerEpisodeAI = anime.duration || "-";
    const genresList = anime.genres.map(g => g.name).join(', ');
    const themesList = anime.themes.map(t => t.name).join(', ');
    const demographicsAI = (anime.demographics && anime.demographics.length > 0) ? anime.demographics.map(d => d.name).join(', ') : "";
    const ratingAI = anime.rating || "-";
    const scoreAI = anime.score || "-";

    const targetRange = shtInputMAL.getRange('E7:E39');
    let values = targetRange.getValues();

    values[0][0] = animeTitleJapaneseAI;                          // E7
    values[2][0]  = animeTitleEnglishAI;                          // E9
    values[4][0]  = animeTitleSynonymAI;                          // E11
    values[6][0]  = imageURLAI;                                   // E13
    values[8][0]  = typeAI;                                       // E15
    values[10][0] = sourceAI;                                     // E17
    values[12][0] = studiosAI;                                    // E19
    values[14][0] = premieredAI;                                  // E21
    values[16][0] = releaseDateBeginAI ? releaseDateBeginAI : ""; // E23
    values[18][0] = releaseDateEndAI ? releaseDateEndAI : "";     // E25
    values[20][0] = episodeCountAI;                               // E27
    values[22][0] = durationPerEpisodeAI;                         // E29
    values[24][0] = genresList;                                   // E31
    values[26][0] = themesList                                    // E33
    values[28][0] = demographicsAI;                               // E35
    values[30][0] = ratingAI;                                     // E37
    values[32][0] = scoreAI;                                      // E39

    targetRange.setValues(values)
    
  } catch (error) {
    Browser.msgBox("Error mengambil data: " + error.toString());
  }
}