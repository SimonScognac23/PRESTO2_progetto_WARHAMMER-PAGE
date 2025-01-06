// .json :   JavaScript Object Notification
// fetch() : chiamata asincorna che permette di collegare  il nostro file JS a un collegamento esterno e c'e lo srestituisce sottoforma di promise, dopo usando altri metodi noi prendiamo questa promise e la convertiamo nel dato che ci serve
// .then() : Questo metodo permette di convertire la Promise nel dato strutturale e di poterlo utilizzare come tale su JS


// 1. fetch()=   Mi collego al .json e ne ottengo una Promise
// 2. .then()=   Converto la Promise in un dato strutturale JS (oggetto)
// 3. .then()=   Un altro .then che si concatena a quello sopra, utilizzeremo il dato ottenuto 


// .json() : Metodo delle Promise che mi permette di convertirla in oggetto JS










fetch('./annunci.json').then((response) => response.json()).then((data) => {
    // Qui ora la fetch mi sta restituendo una promise che posso convertire con .then()
    // Il secondo passaggio invece attraverso il dato che mi è arrivato che chiameremo data fanne qualcosa, ossia una callback e in questa seconda callback che andremo a scrivere tutta la logica per usare il JSON trasmesso
    // ora l'array si andara a chiamare su JS data

    data.sort((a, b) => a.price - b.price);   // Partendo da data fai un sort con a e b visto che sono oggetti di data, cosi li ordiniamo in maniera crescente i prezzi


    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');




    // Function per generare i filtri per categoria
    function radioCreate() {
        //Partendo da data (che è l'array) fai una .map e mi creo un clone, e per ogni annuncio restituirmi la sua categoria tramite il metodo annuncio.category
        let categories = data.map((annuncio) => annuncio.category);

        console.log(categories);

        // Ora mi devo creare un array dove gli annunci non si stanno ripetendo, in pratica non deve comparire due volte la stessa categoria in questo array che andremo a creare 
        // Ho due metodi per farlo:      1 Tramite il forEach
        // Partendo da categories fai un forEach dove per ogni singola category fai un controllo 

        //      PRIMO METODO

        //   let uniqueCategories = [];
        //   categories.forEach((category) => {
        //     if (!uniqueCategories.includes(category)) {
        // Se uniqueCategories non include la categoria, quindi se ci restituisce true diventerà !true (not true, quindi non vero false), se ci restituisce false avremo ( notFalse quindi vero)
        //        uniqueCategories.push(category)
        //     }  // Se non la include fai il push della singola categoria, altrimenti non fai nulla

        // FINE PRIMO METODO 



        //      SECONDO METODO    //
        // 2 metodo per filtrare le categorie è quello di utilizzare una classe chiamata Set()
        // Array.from() : mi permette di convertire un array-like in un array

        let uniqueCategories = Array.from(new Set(categories)); // Faccio un set da categories, ossia l'array con tutti i nomi 
        console.log(uniqueCategories); // ora dentro uniqueCategories ho un array che è stato ottenuto tramite Array.from

        uniqueCategories.forEach((category) => {   // Per ogni singola category fai qualcosa..(ovvero replicare il form-check)

            let div = document.createElement('div');  // Creiamo elemento div
            div.classList.add('form-check');
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">   
                <label class="form-check-label" for="${category}">                     
                     ${category}                                                   
                 </label>    

             `;
            //  innerHTML = input elettronica ha l'id elettronica usando il ${} su id=..., percio quando clicco su uno dei bottono andrà a prendere il suo ID e filtrami quegli annunci che hanno soltanto la categoria identica a l'ID del bottone sul quale ho clicato
            radioWrapper.appendChild(div);

        });
    }
    radioCreate();











    //                  Funzione per troncare le stringhe             //

    function truncateWord(string) {     // Funzione per troncare stringhe troppo lunghe, accetta stringhe quindi noi gli passiamo una stringa 
        if (string.length > 15) {        // Se la stringa ha piu di 15 caratteri...
            return string.split(' ')[0] + '...';  // fammi un array parola per parola e restituiscimi quello in posizione zero ossia la prima parola

        } else {
            return string;   // Altrimenti restituiscmi la stringa
        }

    }
    //                  Funzione per troncare le stringhe              //













    //            Funzione che mi permette di mostrare tutte le cards     //
    function showCards(array) {  // all inizio showCards accetta un array
        cardWrapper.innerHTML = ''; // Svuoto il wrapper in modo che ogni volta che cambio genere le card si eliminano
        array.forEach((annuncio, i) => {
            let div = document.createElement('div')                   // Per ogni annuncio (che è l'oggetto all'interno di JSON) creami un div
            div.classList.add('card-custom');
            div.innerHTML = `
                  <img src="https://picsum.photos/${300 + i}" alt="img casuale" class="img-fluid img-card">
                    <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead">${annuncio.price} euro</p>
             `;
            cardWrapper.appendChild(div);
            // se nel div.innnerHTML voglio mettere una foto faro cosi :        <img src="https://picsum.photos/300" alt="img casuale" class="img-fluid img-card">
            //   INNER.HTML ===>       <img src="${annuncio.img}" class="img-fluid img-card">   <=== Questo per richiamare la foto univoca dentro l'oggetto se dovrebbero esserci delle foto 
            // Per ogni annuncio che è un oggetto se io voglio andare a vedere il suo nome io scrivero: $annuncio.name e cosi via per le altre ossia category e price
            // title=${annuncio.name} questo serve per far si che quando passo con il mouse veda tutto il nome anche se è stato tagliato
        });

    }
    showCards(data);  // Viene fatto scattare tutto al caricamento della pagina e al caricamento della pagina è data, ma dentro la function filterByCategory la showCards è filtered showCards(filtered)












    let radioButtons = document.querySelectorAll('.form-check-input');  // Catturo tutti gli elementiche hanno la classe form-check.input, che sono i bottoni del genere affinche possa cliccare e vedere gli elementi filtrati


    //           Funzione che si occuperà di andare a fare il filtro per categorie   START  //
    // Questa funzione ho bisogno di ottenere un nuovo array partendo da data e gli elementi del nuovo array dovranno soddidfare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione
    function filterByCategory(array) {     // NON PRENDE PIU IN INGRESSO UNA CATEGORIA MA UN ARRAY










        // LA CATEGORIA VOGLIO TROVARLA PARTENDO DALLA LISTA DI TUTTI I BOTTONI E USARE IL METODO .FIND() DEGLI ARRAY SU QUESTA LISTA
        // IL METODO .FIND() HA UNA CONDIZIONE DA RISPETTARE CHE è IL BOTTONE CHE POSSIEDE L'ATTRIBUTO CHECKED!!!, QUINDI .FIND TROVA QUEL BOTTONE NELLA LISTA DEI BOTTONI CHE HA LATTRIBUTO CHECHED OSSIA QUELLO CHE HO CLICCATO!!                E SIMILE A .FILTER MA NON CREA UN CLONE DI ARRAY!!!
        // DA TUTTI I BOTTONI CATTURATI MI DEVI PRENDERE LA SINGOLA CATEGORIA 

        //  let categoria = Array.from(radioButtons).find((button) => button.checked).id;                 // PARTENDO DA UN ARRAY LIKE CHE è RADIO BUTTONS APPLICA ARRAY.FROM PER CONVERTIRLO IN UN ARRAY 
        // DENTRO LA VARIABILE CATEGORIA RADIOBUTTONS è STATO TRASFORMATO IN UN ARRAY!! E ADESSO APPLICO IL FIND() QUINDI USANDO LA CALLBACK PER OGNI BUTTON TROVAMI IL BUTTON.CHECKED
        // .ID LO DEVO INSERIRE PERCHE MI SERVE LA SUA PROPRIETA 



        //RISCRITTO PASSO DOPO PASSO SENZA APPLICARE LA CONCATENAZIONE TRA METODI!!  IN PRATICA STO RISCRIVENDO QUESTO     ========>    let categoria = Array.from(radioButtons).find((button) => button.checked).id;     
        let arrayFromNodeList = Array.from(radioButtons);  // LA LISTA DI TUTTI I BOTTONI NON è PIU UNA NODELIST MA UN ARRAY
        let button = arrayFromNodeList.find((bottone) => bottone.checked);      // PARTENDO DA ARRAYFROMNODELIST APPLICA METODO FIND CHE DEVE AVERE UNA CALLBACK E PER OGNI BOTTONE DAMMI IL BOTTONE .CHECHED
        let categoria = button.id; // OTTENGO L ID DEL BOTTONE











        if (categoria != 'All') {    // Se la categoria che ti sto passando è diversa da ALL 

            let filtered = array.filter((annuncio) => annuncio.category == categoria);  // Partendo da data alla categoria gli passo una determinata categoria che dovra essere uguale alla proprietà dell'oggetto annuncio.category

            //  showCards(filtered);          =========>       //Lanciamo showCards su l'arrayFiltered, ossia su l'array nel quale mi devi mostrare le cards
            return filtered;   // AL POSTO DI SHOWCARD() PERCHE DEVO AVERE UN RETURN PER EVITARE UNDEFINED 

        } else {

            // showCards(data);  // Altrimenti mostrami tutti gli annunci
            return array; // ANCHE QUI HO UN RETURN
            //    }
            //           Funzione che si occuperà di andare a fare il filtro per categorie END    //


        }

    }


    radioButtons.forEach((button) => {            //Per ogni bottone aggiungi un evento, ossia al click...
        button.addEventListener('click', () => {
            //    filterByCategory()
            setPriceInput(); // RILANCIO IL SETPRICE INPUT PER FAR SI CHE SE SELEZIONO UNA CATEGORIA IL PREZZO VARIA A SECONDA LA CATEGORIA SELEZIONATA!!!!!!! SUGGERIMENTO MICHAEL
            globalFilter();
            //ORA A TUTTI GLI ADD EVENTLISTENER LANCIAMO GLOBAL FILTER()!!!!!!
            // Ora prendiamo i radioButtons per poterci prendere la categoria da usare sugli annunci, perchè ogni genere ha il suo id, lo avevamo fatto prima tramite il ${category}
            // filterByCategory(button.id);  // Lanciamo il filterByCategry sul id del bottone che abbiamo creato, perchè l'id è uguale alla categoria 
            //PRIMA LA CATEGORIA LA PRENDEVAMO DAL BUTTON.ID ALL EVENTO CLICK ORA FILTERBYCATEGORY LA LANCIAMO DENTRO GLOBALFILTER
        })
    });












    //                    FUNZIONE CHE MI IMPOSTA SUL VALUE IL PREZZO MAX E MIN   

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');


    function setPriceInput() {  // Dopo aver catturato l'input voglio settare come proprietà max dello stesso il valore più alto tra i price di  ogni prodotto. Per farlo avrò bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera decrescente o crescente e prendermi l'elemento con il valore più 

        // Partendo da un array di oggetti..faccio un map e mi prendo solo il price ossia il prezzo
        let prices = filterByCategory(data).map((annuncio) => +annuncio.price);  // annuncio.price è un valore in stringa, tramite il + lo converto in numeri LANCIO FILTERBYCATEGORY DI DATA OSSIA L'ARRAY CHE MI è STATO RITORNATO SUGGERIMENTO MICHAEL!!!!!!
        prices.sort((a, b) => a - b); // Uso il metodo degli array sort per mettere in ordine decrescente i prezzi, richiamando 2 valori a,b
        let maxPrice = Math.ceil(prices.pop());  // con il metodo .pop() prende l'ultimo elemento e lo salva in maxPrice, il Math.ceil arrotonda il prezzo
        priceInput.max = maxPrice; // l'input max di priceInput che è l'elemento che abbiamo catturato con l'id input deve diventare uguale al valore di maxPrice che è il valore del prezzo piu alto, in pratica abbiamo settato il prezzo piu alto sul button
        priceInput.nodeValue = maxPrice;  // Cosi al caricamento della pagina ho subito il prezzo piu alto e non 100  vedi questo pezzo di codice HTML  ===>     min="0" max="100">
        priceValue.innerHTML = maxPrice; // Al caricamento della pagina al price.value gli do il maxPrice
    }


    setPriceInput();  // L ARRRAY CHE MI RIOTRNA CHE ENTRA COME PARAMETRO NELLA FUNZIOE SETPRICE INPUT è FILTERBYCATEGORY


    //                FUNZIONE CHE SI OCCUPA DI FILTRARE IL PREZZO

    function filterByPrice(array) {  // Questa funzione filtra i prezzi basandosi sul value del nostro input
        let filtered = array.filter((annuncio) => +annuncio.price <= priceInput.value);    // Partendo da data fai un .filter() e mi restituisci ogni volta l'annuncio in cui il prezzo sia minore del nostro priceInput.value
        // showCards(filtered);  // +annuncio.price lo convertiamo prima in number!
        return filtered;
        //ORA PRENDO IN INGRESSO UN ARRAY ED  è SU QUELL ARRAY CHE FAI FILTRO, QUANDO FARO FILTERED NON LANCIO  SHOWCARDS MA MI RITORNI FILTERED!!!!!
    }


    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value;  // Cosi lo vediamo muoversi il prezzo sul RANGE!!
        //  filterByPrice()
        //ORA A TUTTI GLI ADD EVENTLISTENER LANCIAMO GLOBAL FILTER()!!!!!!
        globalFilter();
    });    // Ora a ogni input ossia quando muoviamo il range,  lanciami filterByPrice










    //                     FUNZIONE CHE MI CERCA LE PAROLE CHIAVI; AD ESEMPIO JONSON SE IO SCRIVO 'SO' MI DA SUBITO LION EL JONSON
    let wordInput = document.querySelector('#wordInput');
    function filterByWord(array) {
        // Questa funzione filtra gli elementi partendo da data, in modo tale che nel loro name sia incluso la parola che gli stiamo passando 
        // Includes()  ==> metodo che si puo utilizzare sia sugli array che sulle stringhe

        let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));    // questa funzione fa si che ciascuno annuncio l annuncio.nome deve includere la parola che ti passo io
        //  showCards(filtered);
        //FILTERED BY WORD PRIMA ACCETTAVA UNA PAROLA CHE ERA WORDINPUT.VALUE MA ORA NON PRENDE PAROLA MA ACCETTA UN ARRAY 
        // ED è SU QUESTO ARRAY CHE FACCIO IL FILTRO DI FILTEREDBY PRICE GIA FILTRATO DA FILTEREDBYCATEGORY!!!!
        return filtered;
    }

    wordInput.addEventListener('input', () => {
        // Ora aggiungiamo un addEventListener al pulsante input che abbiamo catturato tramite la classe .word-input e tramite il value cerchiamo la parola che dobbiamo inserire
        // filterByWord(wordInput.value);
        //ORA A TUTTI GLI ADD EVENTLISTENER LANCIAMO GLOBAL FILTER()!!!!!!
        globalFilter();
    })








    //                         FUNZIONE FINALE!!!!!!!!! QUELLO SCRITTO QUI SOTTO è TUTTO IN MAIUSCOLO!!!!!!!!
    //                         FUNZIONE FINALE!!!!!!!!! QUELLO SCRITTO QUI SOTTO è TUTTO IN MAIUSCOLO!!!!!!!!



    //  Quello di cui abbiamo bisogno è che ad ogni evento scattino tutti e tre le funzioni di filtro ma non siano applicate tutte e tre sull'array data bensi siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente 
    // Dobbiamo creare un unica funzione globale per ciò e la facciamo scattare ad ogni evento

    function globalFilter() {     // Questa funzione deve lanciare in sequenza le tre funzioni
        let filteredByCategory = filterByCategory(data);                 // Dentro filteredByCategory avro come risultato "undefinded", perchè la funzione filterByCategory() non ha un return, quindi, avro undefined,ORA PERO L ABBIAMO AGGIUSTATA E NON TORNA PIU UNDEFINDED MA UN ARRAY FILTRATO PER CATEGORIA
        let filteredByPrice = filterByPrice(filteredByCategory);  // QUINDI ANCHE QUESTA FUNZIONE MI RITORNA ARRAY FILTRATO SIA PER CATEGORIA CHE PER PREZZO!
        // let filteredByCategory = undefined;      avro questo!

        let filteredByWord = filterByPrice(filteredByPrice); // LA FUNZIONE FILTEREDBYWORD VERRA LANCIATA SU FILTTEREDBYPRICE
        // ORA SU FILTERED BY WORD MI RITORNA UN ARRAY FILTRATO PER CATEGORIA PREZZO E PURE PAROLA

        // Se io  voglio filtrare cio che è stato filtrato dalla funzione (ossia filterByCategory) precedente adesso le funzioni scritte fino ad ora sopra non lanciano piu showCards ma mi devono ritornare l'array che stanno filtrando, quindi non ci serve piu showCards ma un return filtered

        showCards(filteredByWord);
    }

});






















