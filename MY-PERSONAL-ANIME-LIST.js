
const Sheet = SpreadsheetApp.getActiveSpreadsheet();
const shtInputMAL = Sheet.getSheetByName('Input MY ANIME LIST');
const shtMAL = Sheet.getSheetByName('MY ANIME LIST');

function saveAnime() {

  const rawData = shtInputMAL.getRange('E5:E53').getValues();

  const animeTitle = rawData[0][0]; //E5
  const animeTitleJapanese = rawData[2][0]; //E7
  const animeTitleEnglish = rawData[4][0]; //E9
  const animeTitleSynonym = rawData[6][0]; //E11
  const imageURL = rawData[8][0]; //E13
  const type = rawData[10][0]; //E15
  const source = rawData[12][0]; //E17
  const studios = rawData[14][0]; //E19
  const premiered = rawData[16][0]; //E21
  const releaseDateBegin = rawData[18][0]; //E23
  const releaseDateEnd = rawData[20][0]; //E25
  const epsCount = rawData[22][0]; //E27
  const durationPerEpisode = rawData[24][0]; //E29
  const genre = rawData[26][0]; //E31
  const demographic = rawData[28][0]; //E33
  const rating = rawData[30][0]; //E35
  const score = rawData[32][0]; //E37
  const watchStatus = rawData[34][0]; //E39
  const progress = rawData[36][0]; //E41
  const personalScore = rawData[38][0]; //E43
  const legalIllegal = rawData[40][0]; //E45
  const platform = rawData[42][0]; //E47
  const description = rawData[44][0]; //E49
  const opensong = rawData[46][0]; //E51
  const endsong = rawData[48][0]; //E53
  
  let row = shtMAL.getRange('AC3').getValue();
  row += 3;

  const formulaImage = '=IMAGE(F' + row + ', 3)'
  const formulaReleaseDate = '=TEXTJOIN("  -  ", true, L' + row + ',M' + row +')'
  const formulaProgress = '=IF(REGEXMATCH(U' + row + ',"^Complete"), "✅", IF(U' + row + '="Watch Later", "🔄", IF(U' + row + '="Watching","🟣", IF(U' + row + '="Drop", "❌", ""))))';
  const finalProgress = (progress === "") ? formulaProgress : progress;
  const contentRRangeMAL = shtMAL.getRange('B' + row + ':AB' + row);
  contentRRangeMAL.setValues([[animeTitle,animeTitleJapanese,animeTitleEnglish,animeTitleSynonym,imageURL,formulaImage,type,source,studios,premiered,releaseDateBegin,releaseDateEnd,formulaReleaseDate,epsCount,durationPerEpisode,genre,demographic,rating,score,watchStatus,finalProgress,personalScore,legalIllegal,platform,description,opensong,endsong]]);
  
  const rangeSorting = shtMAL.getRange('B3:AB' + row);
  rangeSorting.sort({column: 2, ascending: true});

  // const finder = shtMAL.getRange("B3:B" + row).createTextFinder(animeTitle).matchEntireCell(true);
  // const result = finder.findNext();
  // if (result) {shtMAL.setRowHeight(result.getRow(), 350)};

  clearInputMAL();
};

// =================================================================================================================================================

function clearInputMAL() {
  let cellsToClear = ['E5', 'E7', 'E9', 'E11', 'E13', 'E15', 'E17', 'E19', 'E21', 'E23', 'E25', 'E27', 'E29', 'E31', 'E33', 'E35', 'E37', 'E39', 'E41', 'E43', 'E45', 'E47', 'E49', 'E51', 'E53'];
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
    const epsCountAI = anime.episodes || "?";
    const durationPerEpisodeAI = anime.duration || "-";
    const genresList = anime.genres.map(g => g.name);
    const themesList = anime.themes.map(t => t.name);
    const genreAI = [...genresList, ...themesList].join(', ');
    const ratingAI = anime.rating || "-";
    const scoreAI = anime.score || "-";
    const demographicsAI = (anime.demographics && anime.demographics.length > 0) ? anime.demographics.map(d => d.name).join(', ') : "-";

    shtInputMAL.getRange('E7').setValue(animeTitleJapaneseAI);
    shtInputMAL.getRange('E9').setValue(animeTitleEnglishAI);
    shtInputMAL.getRange('E11').setValue(animeTitleSynonymAI);
    shtInputMAL.getRange('E13').setValue(imageURLAI);
    shtInputMAL.getRange('E15').setValue(typeAI);
    shtInputMAL.getRange('E17').setValue(sourceAI);
    shtInputMAL.getRange('E19').setValue(studiosAI);
    shtInputMAL.getRange('E21').setValue(premieredAI);
    if (releaseDateBeginAI) {shtInputMAL.getRange('E23').setValue(releaseDateBeginAI);}
    if (releaseDateEndAI) {shtInputMAL.getRange('E25').setValue(releaseDateEndAI);}
    shtInputMAL.getRange('E27').setValue(epsCountAI);
    shtInputMAL.getRange('E29').setValue(durationPerEpisodeAI);
    shtInputMAL.getRange('E31').setValue(genreAI);
    shtInputMAL.getRange('E35').setValue(ratingAI);
    shtInputMAL.getRange('E37').setValue(scoreAI);

    if (demographicsAI && demographicsAI !== "-") {
      try {
         shtInputMAL.getRange('E33').setValue(demographicsAI);
      } catch (e) {
         shtInputMAL.getRange('E33').clearContent();
      }
    } else {
      shtInputMAL.getRange('E33').clearContent();
    }
    
    // Browser.msgBox("Data Anime berhasil ditemukan dan diisi!");

  } catch (error) {
    Browser.msgBox("Error mengambil data: " + error.toString());
  }
}