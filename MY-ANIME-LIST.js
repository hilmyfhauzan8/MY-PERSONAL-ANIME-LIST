const Sheet = SpreadsheetApp.getActiveSpreadsheet();
const shtInputMAL = Sheet.getSheetByName('Input MY ANIME LIST');
const shtMAL = Sheet.getSheetByName('MY ANIME LIST');

function saveAnime() {

  const rawData = shtInputMAL.getRange('E5:E41').getValues();

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
  const durationPerMinute = rawData[24][0]; //E29
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

  const contentRRangeMAL1 = shtMAL.getRange('B' + row + ':F' + row);
  const contentRRangeMAL2 = shtMAL.getRange('H' + row + ':M' + row);
  const contentRRangeMAL3 = shtMAL.getRange('O' + row + ':AB' + row);
  
  contentRRangeMAL1.setValues([[animeTitle,animeTitleJapanese,animeTitleEnglish,animeTitleSynonym,imageURL]]);
  contentRRangeMAL2.setValues([[type,source,studios,premiered,releaseDateBegin,releaseDateEnd]]);
  contentRRangeMAL3.setValues([[epsCount,durationPerMinute,genre,demographic,rating,score,watchStatus,progress,personalScore,legalIllegal,platform,description,opensong,endsong]]);

  const rangeSorting = shtMAL.getRange('B3:AB' + row);
  rangeSorting.sort({column: 2, ascending: true});

  clearMAL();
};


function saveAnimeEfficiently() {
  const rawData = shtInputMAL.getRange('E5:E41').getValues();

  contentRRangeMAL1.setValues([[rawData[0][0],rawData[2][0],rawData[4][0],rawData[6][0],rawData[8][0]]]);
  contentRRangeMAL2.setValues([[rawData[10][0],rawData[12][0],rawData[14][0],rawData[16][0],rawData[18][0],rawData[20][0]]]);
  contentRRangeMAL3.setValues([[rawData[22][0],rawData[24][0],rawData[26][0],rawData[28][0],rawData[30][0],rawData[32][0],rawData[34][0],rawData[36][0],rawData[38][0],rawData[40][0],rawData[42][0],rawData[44][0],rawData[46][0],rawData[48][0]]]);

  const rangeSorting = shtMAL.getRange('B3:AB' + row);
  rangeSorting.sort({column: 2, ascending: true});

  clearMAL();
};

// =================================================================================================================================================

function clearMAL() {
  let cellsToClear = ['E5', 'E7', 'E9', 'E11', 'E13', 'E15', 'E17', 'E19', 'E21', 'E23', 'E25', 'E27', 'E29', 'E31', 'E33', 'E35', 'E37', 'E39', 'E41', '43', '45', '47', '49', '51', '53'];
  shtInputMAL.getRangeList(cellsToClear).clearContent();
  // shtInputMAL.getRange('E29').setValue('23 min per ep');
};


function clearMALEfficiently() {
  shtInputMAL.getRangeList(['E5', 'E7', 'E9', 'E11', 'E13', 'E15', 'E17', 'E19', 'E21', 'E23', 'E25', 'E27', 'E29', 'E31', 'E33', 'E35', 'E37', 'E39', 'E41', '43', '45', '47', '49', '51', '53']).clearContent();
};

// =================================================================================================================================================

function searchAnimeInfo() {
  const Sheet = SpreadsheetApp.getActiveSpreadsheet();
  const shtInputMAL = Sheet.getSheetByName('Input MY ANIME LIST');
  
  // 1. Ambil Judul dari E5
  const query = shtInputMAL.getRange('E5').getValue();
  
  // Error Handling jika belum memasukkan judul anime
  if (query === "") {
    Browser.msgBox("Silakan masukkan Judul Anime terlebih dahulu.");
    return;
  }

  // 2. Siapkan URL untuk request ke Jikan API
  // encodeURIComponent memastikan judul yang ada spasi/simbol aman untuk URL
  const url = 'https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(query) + '&limit=1';

  try {
    // 3. Panggil API (Fetch)

    // const response = UrlFetchApp.fetch(url);
    // const json = JSON.parse(response.getContentText());

    const json = JSON.parse(UrlFetchApp.fetch(url).getContentText());

    // Cek apakah ada hasil
    if (!json.data || json.data.length === 0) {
      Browser.msgBox("Anime tidak ditemukan!");
      return;
    }
    const anime = json.data[0];
    const titleJapanese = anime.title_japanese || "-";
    const titleEnglish = anime.title_english || "-";
    const titleSynonym = anime.title_synonyms || "-";
    const image = anime.images.jpg.image_url || "-";
    const type = anime.type || "-";
    const source = anime.source || "-";
    const studios = anime.studios.map(s => s.name).join(', ') || "-";
    const premiered = (anime.season && anime.year) ? 
                      (anime.season.charAt(0).toUpperCase() + anime.season.slice(1) + " " + anime.year) : "-";
    const dateBegin = anime.aired.from ? new Date(anime.aired.from) : "";
    const dateEnd = anime.aired.to ? new Date(anime.aired.to) : "";
    const epsCount = anime.episodes || "?";
    const duration = anime.duration || "-";
    const genresList = anime.genres.map(g => g.name);
    const themesList = anime.themes.map(t => t.name);
    const fullGenre = [...genresList, ...themesList].join(', ');
    const demographics = anime.demographics.map(d => d.name).join(', ') || "-";

    shtInputMAL.getRange('E7').setValue(titleJapanese);
    shtInputMAL.getRange('E9').setValue(titleEnglish);
    shtInputMAL.getRange('E11').setValue(titleSynonym);
    shtInputMAL.getRange('E13').setValue(image);
    shtInputMAL.getRange('E7').setValue(type);
    shtInputMAL.getRange('E9').setValue(source);
    shtInputMAL.getRange('E11').setValue(studios);
    shtInputMAL.getRange('E13').setValue(premiered);
    if (dateBegin) {shtInputMAL.getRange('E15').setValue(dateBegin);}
    if (dateEnd) {shtInputMAL.getRange('E17').setValue(dateEnd);}
    shtInputMAL.getRange('E19').setValue(epsCount);
    shtInputMAL.getRange('E21').setValue(duration);
    shtInputMAL.getRange('E23').setValue(fullGenre);
    shtInputMAL.getRange('E25').setValue(demographics);
    
    Browser.msgBox("Data Anime berhasil ditemukan dan diisi!");

  } catch (error) {
    Browser.msgBox("Error mengambil data: " + error.toString());
  }
}