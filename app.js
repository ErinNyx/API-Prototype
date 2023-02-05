// Dependencies
const express = require('express');
const http = require('https');

// Server stuff
const app = new express();
const port = process.env.port || 80;
const server = http.createServer(app);

// CAH Setup
// The packs setup is not how I would do it in a production environment
// It may seem very stupid this way, but the API accepts input as pack,pack,pack with no spaces between
// and because POST methods are disabled I have to do pack1Term1%20pack1Term2,pack2%20term1pack2%20term2
// and I'm just not formatting an array into a string like that for a homework assignment when I can just manually input

// I suppose one solution, if this is for a website (rather than a discord application like in terms of what I was
// thinking of) is to take checkboxes on the site for all the packs you can fit in a page and assign them values equal to
// the format you need and just tack them onto a control link with commas in between
// Also you'd want this stored in a game object that's unique to the session id of the user who's "hosting" the game

// This shall do for now
var prompts;
var responses;
var packs = 'CAH%20Base%20Set,CAH:%202000s%20Nostalgia%20Pack';

// This is a sample hand to simulate what you would get in a normal player object
var hand;

// Get from API

// Returns all the packs you can select
/* fetch('https://restagainsthumanity.com/api')
    .then(response => response.json())
    .then(packs => console.log(packs)); */

// n is the number of cards you want in your starting hand
function randomHand(n) {
    const shuffled = responses.sort(() => 0.5 - Math.random());
    return hand = shuffled.slice(0, n);
}

function populatePacks() {
    return fetch('https://restagainsthumanity.com/api?packs='+packs, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((cards) => {
            prompts = cards.black;
            responses = cards.white;
        });
}

// For this, because I do not have the rest of the app set up, it won't be the full game
// Normally what you would need to do is have 3 or more players with player objects and
// distribute the hands based on the number of turns they selected at the start of the game
// and lots of other things that's just general game set up that's not necessary for this assignment
// For now, this function will simply distribute one hand and output it as an array in the console
// And then it will output the first prompt card and if you want you can try to answer that based on what you got
async function runGame() {
    // I know this goes against typical convention in programming where you have all your local variables at the top
    // and then the functional aspects come after those variables
    // but for Javascript you simply cannot do that, literally cannot do that all the time,
    // as the language is asynchronous and sometimes you have to wait for some functions to finish before you can
    // shuffle your deck if you don't want your program to crash.
    // populatePacks MUST finish processing first before shuffled can run, that is simply the nature of this language.
    // Before you ask, No. I cannot run populatePacks() before I run runGame() because populatePacks MUST finish before
    // any other function can continue, which means it needs to be in an async/await structure. To use an async/await
    // structure you need to enclose it in a function
    // This was simply the easiest, and only way
    // Welcome to Javascript, you may take points if you wish but they would be unjustified
    await populatePacks();
    await randomHand(10);

    const shuffled = prompts.sort(() => 0.5 - Math.random());

    // I could just leave it at this, but let's format that a little bit shall we?
    // console.log(hand.splice(0, 1));
    // console.log(prompts.splice(0, 1));

    let prompt = prompts.splice(0, 1);
    let promptText = '(Pick: ' + prompt[0].pick + ') ' + prompt[0].text;

    let responseText = hand.join(', ').trim();

    console.log(promptText);
    console.log();
    console.log('Hand: ' + responseText);
}

runGame();

server.listen(port, () => console.log('Listening on ' + port));