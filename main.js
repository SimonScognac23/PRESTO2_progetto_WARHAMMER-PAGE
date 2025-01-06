let navbar = document.querySelector('#navbar'); // catturiamo la navbar
let logoNavbar = document.querySelector('#logoNavbar'); // catturiamo logo navbar
let firstNumber = document.querySelector('#firstNumber'); // catturiamo il firstNumber che è il primo numero che si andrà ad incrementare tramite il setInterval
let secondNumber = document.querySelector('#secondNumber'); // catturiamo il secondNumber che è il secondo numero che si andrà ad incrementare tramite il setInterval
let thirdNumber = document.querySelector('#thirdNumber');
let swiperWrapper = document.querySelector('.swiper-wrapper'); // swiperWrapper è la classe utilizzata da swiperJs



let links = document.querySelectorAll('.nav-link'); // catturiamo tutti quelli che hanno la classe nav-link e li mettiamo tutti dentro un array like


let confirm = true; // quando il confirm si incontra per la prima volta scattano i tre numeri, ma confirm diventà false



navbar.style.height = '90px'; // la navbar la facciamo diventare più grande di partenza, usando .style




window.addEventListener('scroll', () => {    // all' evento scroll di window fai partire una callback
    console.log(window.scrollY);  // ogni volta che scrollo stampami in console il valore di scrollY ossia il valore di quanto scendo con la pagina
    let scrolled = window.scrollY; // salviamo window.scrollY in una variabile

    if (scrolled > 0) {

        navbar.style.height = '180px'; // la navbar la facciamo diventare più grande, usando .style

        // Imposta l'immagine di sfondo della navbar
        navbar.style.backgroundImage = "url('https://www.hdwallpapers.in/download/dark_angels_warhammer_40k_4k-1280x800.jpg')";
        navbar.style.backgroundSize = 'auto';  // Usa le dimensioni originali dell'immagine
        navbar.style.backgroundPosition = 'left center';  // Posiziona l'immagine a sinistra e centrata verticalmente
        navbar.style.backgroundRepeat = 'no-repeat';  // Assicura che l'immagine non si ripeta

        links.forEach((link) => {  // per ogni link gli diamo il colore ironfist
            link.style.color = 'var(--ironfist)';
        });

        logoNavbar.src = 'http://127.0.0.1:5500/project/media/logonavbar3.png'; //manipolazione dell'attributo src


    } else {
        navbar.style.height = '90px';
        navbar.style.backgroundImage = 'none';

        links.forEach((link) => {  // per ogni link gli diamo il colore ultramarine
            link.style.color = 'var(--ultramarine)';
        });

        logoNavbar.src = 'http://127.0.0.1:5500/project/media/logonavbar2.png';
    }

});






// setInterval è una funzione che vuole 2 parametri, il primo è una callback, il secondo è l'intervallo di tempo che deve passare tra una iterazione e l'altra
// salviamo il set-interval ossia la chiamata asincrona dentro una variabile
// clearInterval() : pulire un intervallo e interromperlo
// setTimeout() : fa partire un blocco di istruzioni dopo tot secondi



function createInterval(n, element, time) {  //dobbiamo passare alla funzione tre valori, il primo è il numero per il quale vogliamo arrivare, poi l'elemento innerHTML dove far apparire il numero (element) e poi l'intervallo di tempo (time)

    let counter = 0;

    let interval = setInterval(() => {
        if (counter < n) {
            counter++
            element.innerHTML = counter;
        } else {

            clearInterval(interval);
        }
    }, time);


    // il setTimeout scatta dopo il createInterval
    setTimeout(() => {  //il setTimeout è identico a setinterval, ossia vuole una callback e un timeout, che rappresenta il tempo ogni volta che deve succedere questo evento
        confirm = true; // dentro la callback mettiamo che il confirm deve diventare true
    }, 8000); // dopo 8 secondi diventa true, quindi dopo 8 secondi dopo che è scattata la funzione createInterval confirm diventa true

}





// IntersectionObserver : è una classe del browser che si occupa di far scattare una funzione nel momento in cui il browser sono visibili gli elementi HTML che noi gli indichiamo 
// prima cosa salvare l'oggetto dentro una variabile
// new : keyword che mi permette di generare un oggetto partendo da una classe 
// In questo oggetto scatta una callBack la quale accetta un qualsisasi numero di parametri e li salva nel parametro formale entries che è un array

let observer = new IntersectionObserver((entries) => {       // dentro la variabile observer stiamo creando un oggetto di classe intersectionObserver

    // entries = [firstNumber]

    entries.forEach((entry) => {

        if (entry.isIntersecting && confirm) {  //entry.isIntersecting significa che se l'entry è stata intersecata o incontrata fai scattare qualcosa...
            createInterval(40000, firstNumber, 1);  // fai scattare il createInterval dei tre numeri
            createInterval(315, secondNumber, 1);
            createInterval(10, thirdNumber, 100);
            confirm = false;  // una volta che è entrato qua dentro il confirm diventa false (il confirm parte da true)


        }

    });
});



observer.observe(firstNumber);  // questo è un metodo che fa scattare tutto quello che abbiamo scritto sopra (let observer...)
// quando incontri firsNumber fai scattare quello scritto sopra, quindi quando scrollando la pagina incrociamo firstNumber partirà tutto quello che è scritto sopra
// entries = [firstNumber]








// array di recensioni 
let reviews = [
    { user: 'Simone', description: `Ottimo esercito i Dark Angels!`, rank: 5 },
    { user: 'Gianluca ', description: `i Dark Angels? si però meglio gli Orki`, rank: 4 },
    { user: 'Matteo', description: `Necron tutta la vita`, rank: 1 },
    { user: 'Andrea', description: `Astra Militarum!!!!!!!`, rank: 2 },
    { user: 'Davide', description: `Si però gli Space Marines sono troppo forti!!!`, rank: 1 },
    { user: 'Luca', description: `Ma quali dark meglio i Blood Angels`, rank: 4 },
]



reviews.forEach((recensione) => {
    let div = document.createElement('div');  // creiamo elemento div
    div.classList.add('swiper-slide'); // assegniamo la classe swiper-slide al div appena creato e lo riempiamo tramite inner.HTML
    div.innerHTML = `
                                 <div class="card-review">
                                        <p class="lead text-center">${recensione.description}</p>
                                        <p class="h4 text-center">${recensione.user}</p>
                                        <div class="d-flex justify-content-center star">
                                          
                                        </div>
                                 </div>
                                
    
    `;
    swiperWrapper.appendChild(div);  // appenderlo al wrapper
});  // per ogni singola recensione







let stars = document.querySelectorAll('.star') // stars è il div vuoto che deve contenere le stelle
// ciclo per ottenere le stelle date in recensione

stars.forEach((star, index) => {  // per ogni stella devi rank volte creare una stella ed appenderlo usando l'indice, in pratica sto ciclando dentro l'array
    for (let i = 1; i <= reviews[index].rank; i++) {  // vai su reviews in posizione index.rank, in pratica sto dicendo: per Simone devi ciclare da 1 a 5.. e cosi via con gli altri

        // Ora creiamo la stella per la recensione
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star') // al tag <i> ci aggiungi e classi fa-star e fa-solid
        star.appendChild(icon);
    }

    // ora per fare apparire anche le stelle vuote
    let difference = 5 - reviews[index].rank;  // a  5 gli togliamo il voto
    for (let i = 1; i <= difference; i++) {

        // Ora creiamo la stella per la recensione
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star')
        star.appendChild(icon);
    }

}); //partendo dalla nodeList delle stelle, per ogni signola star devi rank volte creare una stella e appenderla










//Swiper sempre per ultimo

const swiper = new Swiper('.swiper1', {  // crea un nuovo oggetto di classe swiper e poi vuole una classe, ossia un selettore CSS .swiper che gli fa capire che l'elemento in questione è il div con classe swiper, ovviamente dentro .swiper ci sta un query selector
    // .swiper sto catturando l'elemento di classe swiper

    // Optional parameters

    navigation: {   // Effetto preso su resources demos preso da swipe.Js
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // Navigation arrows   // Effetto preso su resources demos preso da swipe.Js
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {  // inseriamo un altro oggetto, autoplay preso su Swiper API
        delay: 3000, // proprieta delay, ogni tot secondi 3sec, si passa alla successiva slide automaticamente
    },



});





