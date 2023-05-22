/*
*******************************************************************************************
General rules
1- The house does not tie.
2- You must match the counter to 21.
3- You must get closer 21 than the computer.Types carts
2C = Two of clovers, 2D = Two of diamonds, 2H = Two of Hearts, 2S = Two of Spades

Values carts
from 2 to 9, the value is the same.
from 10 to K, the value is 10.
the value for As is 11.
*******************************************************************************************
*/
//Variables
let deck = [], countPlayer = 0, countComputer = 0, resultGameString = '', winsGifts = ['win.gif', 'win1.gif', 'win2.gif', 'win3.gif'], losesGifts = ['lose.gif', 'lose1.gif','lose3.gif'];
const tipos = ['C','D','H','S'], especiales = ['A','J','Q','K'];

//HTML Reference locations
const btnNewGame = document.querySelector('#btnNewGame');
const btnRequestCart = document.querySelector('#btnRequestCart');
const btnStop = document.querySelector('#btnStop');
const smallPlayer = document.querySelectorAll('small');
const carts = document.querySelector('#jugador-cartas');
const cartsComputer = document.querySelector('#computadora-cartas');
const btnOpenModal = document.querySelector('#btnOpenModal');
const btnCloseModal = document.querySelector('#btnCloseModal');
const modalLocation = document.querySelector('#modalLocation');
const modalText = document.querySelector('#modalText');

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

const randomItemWins = (winsGifts) =>
    {
    return winsGifts[Math.floor(Math.random()*winsGifts.length)];
    }

const randomItemLoses = (losesGifts) =>
    {
    return losesGifts[Math.floor(Math.random()*losesGifts.length)];
    }

//This function return the result game
const resultGame = (loseOrWin) => {
    modal.showModal();
    const resultGame = document.createElement("img");
    if (loseOrWin === 'Perdiste'){
        resultGame.src =`assets/backgroups/loses/${randomItemLoses(losesGifts)}`;
        modalText.innerText = "U'RE A FUCKING LOSER";
    } else {
        resultGame.src =`assets/backgroups/wins/${randomItemWins(winsGifts)}`;
        modalText.innerText = "U'RE A FUCKING WINER";
    }
    resultGame.classList.add('modal-container');
    modalLocation.append(resultGame);
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
            //resultGameString = 'Perdiste, la casa no empata';
            resultGameString = 'Perdiste';
            resultGame(resultGameString);
        } else if ( puntosMinimos > 21 ){
            resultGameString = 'Perdiste';
            resultGame(resultGameString);
        } else if ( countComputer > 21) {
            resultGameString = 'Ganaste';
            resultGame(resultGameString);
        } else if ( countPlayer < countComputer && countComputer <= 21) {
            resultGame();
        }
    }, 50 );
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
        resultGameString = 'Perdiste';
        resultGame(resultGameString);
        btnRequestCart.disabled = true;
        btnStop.disabled = true;
        turnoComputadora( countPlayer );
    } else if (countPlayer === 21) {
        //alert('Ganaste');
        resultGameString = 'Ganaste';
        resultGame(resultGameString);
        btnRequestCart.disabled = true;
        btnStop.disabled = true;
        turnoComputadora( countPlayer );
    }
})

//Stopped
btnStop.addEventListener('click', () => {
    if (countPlayer === 0) {
        alert('No puedes detener lo que no ha iniciado.');
    } else if (countPlayer != 0){
        turnoComputadora (countPlayer);
        btnStop.disabled = true;
        btnRequestCart.disabled = true;
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

btnOpenModal.addEventListener('click', () => {
   resultGame();
})

btnCloseModal.addEventListener('click', () => {
    modal.close();
    modalLocation.innerHTML = ('');
})

