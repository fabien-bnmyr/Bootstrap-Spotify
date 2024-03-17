fetch('data.json') // requête vers le fichier JSON
  .then(response => response.json()) // convertir la réponse textuelle en JSON
  .then(data => {

// Fonction pour mes titres favoris
    function mesTitresFavoris(data){
        // récupération du template
        let template = document.getElementById('mesTitresFavoris');
        // parcourir les chansons
        for (let i = 0; i < 3; i++) {
            // faire un clone du template
            const clone = template.content.cloneNode(true);
            // remplir le clone
            clone.querySelector('.card-title').textContent = data[i].name;
            clone.querySelector('.card-text').textContent = data[i].artists[0].name;
            clone.querySelector('.album').textContent = data[i].album.name
            clone.querySelector('.card-img').src = data[i].album.images[0].url;
            clone.querySelector('.card-img').alt = data[i].name;
    
            // ajouter le clone au DOM dans le conteneur
            document.getElementById('trackList').appendChild(clone);
        }
    }
    
// Fonction pour mes artistes favoris
    function mesArtistesFavoris(data){
        let template = document.getElementById('mesArtistesFavoris');
        for (let i = 0; i < 3; i++) {
            // faire un clone du template
            const clone = template.content.cloneNode(true);
            // remplir le clone
            clone.querySelector('.card-title').textContent = data[i].artists[0].name;
            clone.querySelector('.card-img-top').src = data[i].artists[0].images[2].url;
            clone.querySelector('.card-img-top').alt = data[i].artists[0].name;
    
            // ajouter le clone au DOM dans le conteneur
            document.getElementById('trackList2').appendChild(clone);
        }
    }

// Fonction pour mes musiques 
function mesMusiques(data){
    let template = document.getElementById('mesMusiques');
    for (let i = 0; i < 24; i++) {
        // faire un clone du template
        const clone = template.content.cloneNode(true);
        // remplir le clone
        clone.querySelector('.card-title').textContent = data[i].name;
        clone.querySelector('.card-img-top').src = data[i].album.images[0].url;
        clone.querySelector('.card-img-top').alt = data[i].artists[0].name;

        // ajouter le clone au DOM dans le conteneur
        document.getElementById('Musiques').appendChild(clone);
    }
}

// Fonction pour prendre un nombre aléatoire
function nombreAleatoire(min, max){
  return Math.round(Math.random() * (max - min) + min)
}

//Fonction pour changer de musique
function changerMusique(data){
  let musiqueActuelle = document.getElementById('infoMusique');
  const i = nombreAleatoire(0, data.length);
  musiqueActuelle.querySelector('.nomChanson').textContent = data[i].name;
  musiqueActuelle.querySelector('.nomArtiste').textContent = data[i].artists[0].name;
  musiqueActuelle.querySelector('.cover').src = data[i].album.images[2].url;
  musiqueActuelle.querySelector('.cover').alt = data[i].artists[0].name;
  musiqueActuelle.querySelector('.audio').src = data[i].preview_url;
  jouerMusique(data);
}

//Fonction pour lancer la musique
function jouerMusique(data){
  let musiqueActuelle = document.getElementById('infoMusique');
  let play = document.getElementById('musiquePlayer')
  play.querySelector('#play').classList.add("d-none")
  play.querySelector('#pause').classList.remove("d-none")
  musiqueActuelle.querySelector('.audio').play()
}

//Fonction pour mettre pause
function pauseMusique(data){
  let musiqueActuelle = document.getElementById('infoMusique');
  let play = document.getElementById('musiquePlayer')
  play.querySelector('#play').classList.remove("d-none")
  play.querySelector('#pause').classList.add("d-none")
  musiqueActuelle.querySelector('.audio').pause()

}

// Construction des données des graphique
function graphiqueDataGenres(data) {
  const genresMap = new Map()
  for (let i = 0; i < data.length; i++) {
    if (data[i].artists[0].genres.length > 0){
      const genre = data[i].artists[0].genres[0]
      // On vérifie si le genre est déjà présent
      if (genresMap.has(genre)) {
        // Si oui, on incrémente
        genresMap.set(genre, genresMap.get(genre) + 1)
      } else {
        // Sinon, on créer le genre
        genresMap.set(genre, 1)
      }
    }
  }
  const tab_genre = []
  const tab_genre_data = []
  n = 7
  for ([key, value] of genresMap) {
    tab_genre.push(key);
    tab_genre_data.push(value)
    n -= 1
    if (n==0){
      break
    }
  }
  return {labels: tab_genre, data: tab_genre_data}
}
  
function graphiqueDataArtists(data) {
  const ArtistsMap = new Map()
  for (let i = 0; i < data.length; i++){
    const artist = data[i].artists[0].name
    if (ArtistsMap.has(artist)){
      ArtistsMap.set(artist, ArtistsMap.get(artist) + 1)
    } else {
      ArtistsMap.set(artist, 1)
    }
  }
  console.log(ArtistsMap)
  const tabArtist = []
  const tabDataArtist = []
  for ([key, value] in ArtistsMap){
    tabArtist.push(key)
    tabDataArtist.push(value)
  }
  return {labels: tabArtist, data:tabDataArtist}
}
    

//Appel des fonctions
    mesTitresFavoris(data);
    mesArtistesFavoris(data);
    mesMusiques(data);
    const graphDataGenre = graphiqueDataGenres(data);
    const graphDataArtist = graphiqueDataArtists(data)
    document.querySelector('#musiqueSuivante').addEventListener('click', function() {changerMusique(data)});
    document.querySelector('#musiquePrecedente').addEventListener('click', function() {changerMusique(data)});
    document.querySelector('#play').addEventListener('click', function() {jouerMusique(data)});
    document.querySelector('#pause').addEventListener('click', function() {pauseMusique(data)});


//Graphique
Chart.defaults.color = '#FFFFFF';
const ctx = document.getElementById('genre');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: graphDataGenre.labels,
      datasets: [{
        label: '# of Votes',
        data: graphDataGenre.data,
        borderWidth: 1
      }]
    }
  });

Chart.defaults.color = '#FFFFFF';
const ctx2 = document.getElementById('artist');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
      }]
    },
  });
});



// Gestion responsive 
window.addEventListener('resize', function(){
  const width = window.innerWidth;
  //Section
  let sectionHome = document.getElementById('home')
  let sectionMusique = document.getElementById('musique')
  let sectionGraphique = document.getElementById('graphique')
  //Nav
  let nav = document.getElementById('navbar')
  let buttonHome = document.getElementById('homeButton')
  let buttonMusique = document.getElementById('musicButton')
  let buttonGraph = document.getElementById('graphButton')

  if (width < 1076){
    //Disparition des sections musique et graphique
    sectionMusique.classList.add('d-none')
    sectionGraphique.classList.add('d-none')
    //Apparition de la navbar
    nav.classList.remove('d-none')
    //Style
    buttonHome.classList.add('text-danger')
  }

  if (width > 1076){
    sectionMusique.classList.remove('d-none')
    sectionGraphique.classList.remove('d-none')
    sectionHome.classList.remove('d-none')
    nav.classList.add('d-none')

  }

  function changerSectionMusique(){
    sectionHome.classList.add('d-none')
    sectionGraphique.classList.add('d-none')
    sectionMusique.classList.remove('d-none')
    buttonMusique.classList.add('text-danger')
    buttonHome.classList.remove('text-danger')
    buttonGraph.classList.remove('text-danger')
    document.getElementById("musique").classList.remove('col-6')
    document.getElementById("musique").classList.add('col')

  }
  buttonMusique.addEventListener('click', function() {changerSectionMusique()});

  function changerSectionHome(){
    sectionHome.classList.remove('d-none')
    sectionGraphique.classList.add('d-none')
    sectionMusique.classList.add('d-none')
    buttonMusique.classList.remove('text-danger')
    buttonHome.classList.add('text-danger')
    buttonGraph.classList.remove('text-danger')
  }
  buttonHome.addEventListener('click', function() {changerSectionHome()});

  function changerSectionGraph(){
    sectionHome.classList.add('d-none')
    sectionGraphique.classList.remove('d-none')
    sectionMusique.classList.add('d-none')
    buttonMusique.classList.remove('text-danger')
    buttonHome.classList.remove('text-danger')
    buttonGraph.classList.add('text-danger')
  }
  buttonGraph.addEventListener('click', function() {changerSectionGraph()});
  
})





