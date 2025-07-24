
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points')
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type')
    },
    fieldCard: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card')
    },
    playerSides: {
    player: 'player-cards',
    playerBOX: document.querySelector('#player-cards'),
    computer: 'computer-cards',
    computerBOX: document.querySelector('#computer-cards')
    },
    actions: {
        button: document.getElementById('next-duel')
    }
};

const playerSides = {
    player: 'player-cards',
    computer: 'computer-cards'
}

const pathImage = './src/assets/icons/';

const cardData = [
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: `${pathImage}dragon.png`,
        WinOf: [1],
        LoseOf: [2]
    },
    {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: `${pathImage}magician.png`,
        WinOf: [2],
        LoseOf: [0]
    },
    {
        id: 2,
        name: 'Exodia',
        type: 'Scissor',
        img: `${pathImage}exodia.png`,
        WinOf: [0],
        LoseOf: [1]
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id;
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = 'Atributo:' + cardData[index].type;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('height', '100px')
    cardImage.setAttribute('src', './src/assets/icons/card-back.png')
    cardImage.setAttribute('data-id', IdCard)
    cardImage.classList.add('card')
    

    if(fieldSide === playerSides.player) {
        cardImage.addEventListener('mouseover', () => {
            drawSelectCard(IdCard)
        });
        
        cardImage.addEventListener('click', () => {
            setCardField(cardImage.getAttribute('data-id'))
        });
    }

    return cardImage
}

async function setCardField(cardId) {
    await removeAllCard();

    let computerCardId = await getRandomCardId();


    await ShowHiddenCardFieldsImage(true)
    
    await hiddenCardDetails();

    await drawCardInfield(cardId, computerCardId);
   
    let duelResults = await checkDuelResult(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = 'block';

}

async function removeAllCard() {
    let { computerBOX, playerBOX } = state.playerSides

    let imgElements = computerBOX.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())

    imgElements = playerBOX.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function checkDuelResult(PlayerCardId, ComputerCardId) {
    let duelResults = 'Empate';
    let playerCard = cardData[PlayerCardId];

    if (playerCard.WinOf.includes(ComputerCardId)) {
        duelResults = 'Win';
        state.score.playerScore++
    }
    
    
    if (playerCard.LoseOf.includes(ComputerCardId)) {
        duelResults = 'Lose';
        state.score.computerScore++
    }
    
    await playAudio(duelResults)
    return duelResults
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = '';
    state.actions.button.style.display = 'none';
    
    state.fieldCard.player.style.display = 'none';
    state.fieldCard.computer.style.display = 'none';

    initial()
}

async function ShowHiddenCardFieldsImage(value) {
    if(value === true) {
        state.fieldCard.computer.style.display = 'block';
        state.fieldCard.player.style.display = 'block';
    }
 
    if(value === false) {
        state.fieldCard.player.style.display = 'none';
    state.fieldCard.computer.style.display = 'none';
    }
}

async function hiddenCardDetails() {
    state.cardSprites.avatar.src = '';
    state.cardSprites.name.innerHTML = '';
    state.cardSprites.type.innerHTML = '';
}

async function drawCardInfield(cardId, computerCardId) {
    state.fieldCard.player.src = cardData[cardId].img;
    state.fieldCard.computer.src = cardData[computerCardId].img;
}
async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`)

    audio.play();
}

function initial() {
    ShowHiddenCardFieldsImage(false)

    drawCards(5, playerSides.player);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById('bgm');
    bgm.play()
}

initial();