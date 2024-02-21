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
    for (let i = 0; i < 6; i++) {
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

// Fonction pour changer de musique
function changerMusique(data){
  let musiqueActuelle = document.getElementById('infoMusique');
  const i = nombreAleatoire(0, data.length);
  musiqueActuelle.querySelector('.nomChanson').textContent = data[i].name;
  musiqueActuelle.querySelector('.nomArtiste').textContent = data[i].artists[0].name;
  musiqueActuelle.querySelector('.cover').src = data[i].album.images[2].url;
  musiqueActuelle.querySelector('.cover').alt = data[i].artists[0].name;
}

//Appel des fonctions
    mesTitresFavoris(data);
    mesArtistesFavoris(data);
    mesMusiques(data);
    changerMusique(data);
    document.querySelector('#musiqueSuivante').addEventListener('click', function() {changerMusique(data)});
    document.querySelector('#musiquePrecedente').addEventListener('click', function() {changerMusique(data)});

});



//Graphique
Chart.defaults.color = '#FFFFFF';
const ctx = document.getElementById('genre');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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



