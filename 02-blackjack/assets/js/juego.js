//Values carts
/*
 * 2C = Two of Clubs 
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

//Este cambio es para probar el commit hacia Github

let deck = [],
    countPlayer = 0,
    countComputer = 0;
const tipos = ['C','D','H','S'],
especiales = ['A','J','Q','K'];
    
//HTML References location 
const btnNewGame = document.querySelector('#btnNewGame');
const btnRequestCart = document.querySelector('#btnRequestCart');
const btnStop = document.querySelector('#btnStop');
const smallPlayer = document.querySelectorAll('small');
const carts = document.querySelector('#jugador-cartas');
const cartsComputer = document.querySelector('#computadora-cartas');

//This function allows me create a new deck

const crearDeck = () => {

    for ( let i = 2; i <= 10; i++) {
        for( let tipo of tipos ){
            deck.push(i + tipo);
        }
    
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ){
            deck.push(esp + tipo);
        }
    
    }

    deck= _.shuffle(deck);
    return deck;
}

crearDeck();

//This function allows me to get a card from the deck

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}


const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor)) ? ( valor === 'A' ) ? 11 : 10 : valor * 1;
}

//Events

const turnoComputadora = ( puntosMinimos ) => {

    do {  
        const carta = pedirCarta();
        countComputer += valorCarta(carta);
        smallPlayer[1].innerText = countComputer * 1;
        const addCart = document.createElement("img");
        addCart.src = `assets/cartas/${carta}.png`;
        addCart.classList.add('carta');
        cartsComputer.append(addCart);

        if( puntosMinimos > 21 ) {
            break;
        } 
        
    } while ( (countComputer < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {

        if( countComputer === puntosMinimos ){
            alert('Perdiste, la casa no empata.');
        } else if ( puntosMinimos > 21 ){
            alert('Perdiste');
        } else if ( countComputer > 21) {
            alert('Ganaste');
        } else if ( countPlayer < countComputer && countComputer <= 21) {
            alert('Perdiste');
        }
    }, 10 );
  
}

//Request card

btnRequestCart.addEventListener('click', () => {

    const carta = pedirCarta();
    const addCart = document.createElement("img");
    addCart.src = `assets/cartas/${carta}.png`;
    addCart.classList.add('carta');
    carts.append(addCart);
    countPlayer += valorCarta(carta);

    //Update countPlayer
    smallPlayer[0].innerText = countPlayer * 1; 
    
    if (countPlayer > 21) { 
        console.warn ('Perdiste');
        btnRequestCart.disabled = true;
        btnStop.disabled = true;
        turnoComputadora( countPlayer );

    } else if (countPlayer === 21) {
        console.warn('Ganaste');
        btnRequestCart.disabled = true;
        btnStop.disabled = true;
        turnoComputadora( countPlayer );
    }
})

//Stopped

btnStop.addEventListener('click', () => {

    btnStop.disabled = true;
    btnRequestCart.disabled = true;
    if (countPlayer === 0) {
        console.warn('No puedes detener lo que no ha iniciado.')
    } else if (countPlayer != 0){
        turnoComputadora (countPlayer);
    }
})

btnNewGame.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();
    countComputer = 0;
    countPlayer = 0;
    smallPlayer[0].innerText = 0;
    smallPlayer[1].innerText = 0;
    carts.innerHTML = ('');
    cartsComputer.innerHTML = ('');
    btnRequestCart.disabled = false;
    btnStop.disabled = false;
})