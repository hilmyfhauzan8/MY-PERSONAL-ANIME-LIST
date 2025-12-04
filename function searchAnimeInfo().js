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