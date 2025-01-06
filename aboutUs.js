let opener = document.querySelector('.opener');  // Catturiamo il div con la classe opener
let circle = document.querySelector('.circle'); // Catturo circle perche circle è il padre di div con la classe moved


let teachers = [           // Ci creaimo l'array di docenti
    { name: '1', description: 'sssgffdgfs', url: '' },
    { name: '2', description: 'sfgbvsss', url: '' },
    { name: '3', description: 'sssbvfhs', url: '' },
    { name: '4', description: 'ssgggnnxxxxss', url: '' },
];


teachers.forEach((docente) => {            // Per ogni docente voglio creare un moved e gli assegno un div, in tutto 4 div uno per ogni docente
    let div = document.createElement('div');
    div.classList.add('moved');  //  Qui gli assegno la classe moved
    div.style.backgroundImage = `url(${docente.url})`;  // Per ogni docente vai a prendere la sua proprietà url
    circle.appendChild(div);


});          // Per ogni docente voglio creare un moved








let movedDivs = document.querySelectorAll('.moved');// Catturo TUTTI e 4 i div con la classe moved

let check = false;

let flipCard = document.querySelector('.flip-card');

opener.addEventListener('click', () => {

    //            --------------  Per creare i div!!  ------------------------
    if (check == false) {  // Se check == false......
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((moved, i) => {      // Usiamo il forEach perche è un arrayLike il moveDivs e ogni div dovra traslare di 150 px
            let angle = (360 * i) / movedDivs.length;  // moveDivs.length è la lunghezza del nostro arraylike e avro nel let angle = 90 perche ho 4 div, mettendolo dentro il rotate(deg) avra come valore 90 gradi
            // 360 * i cosi il movedivs ha il suo angolo!!!
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;  // rotate(-${angle}deg  serve per mettere bene dritte le immagini!!!
        });
        check = true; // E poi check diventa true 

    } else {   // fai tornare tutto alla normalità
        check = false;
        opener.style.transform = 'rotate(0deg)';  // Possiamo anche mettere stringa vuota per fare ritornare alle condizioni normali, sugg.Michael
        movedDivs.forEach((moved, i) => {      // Usiamo il forEach perche è un arrayLike il moveDivs e ogni div dovra traslare di 150 px
            moved.style.transform = 'rotate(45deg)';

        });
        flipCard.classList.add('d-none');  // aggiungiamo la classe d-none per far sparire la card una volta che ho cliccato
    }
});










//  Al click mi devo catturare il docente con la classe moved
// Gli elementi dentro l'arraylist e quelli dentro la nodelist hanno in comune l'indice
// su innerface c'è l immagine del docente
let innerFace = document.querySelector('.inner-face'); // Cattiriamo innerface per far apparire la foto dinamicamente

let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');


movedDivs.forEach((moved, i) => {   //Per ogni moved prendi il suo indice e stampami in console...
    moved.addEventListener('click', () => {   // A ogni moved fai l addeventlistener all'evento click ..
        flipCard.classList.remove('d-none');
        let docente = teachers[i];  // Ci salviamo in una variabile la posizione dell'array dell insegnante in posizione i, in questa variabile ho l'oggetto del docente che mi serve e qundi si puo accedere a tutte le sue proprietà
        // Ora per crearci la card del docente..con ogni foto del docente...
        innerFace.style.backgroundImage = `url(${docente.url})`;  // cosi al click cambia la foto
        cardName.innerHTML = docente.name;            // per modificare l'interno del contenuto con il tag cardName usero innerHTML e andro a modificare il nome e per arrivare al nome usero docente.name
        cardDescription.innerHTML = docente.description;  // stessa cosa per modificare la descrizione usero docente.description
    });
});