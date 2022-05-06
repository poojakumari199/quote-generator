
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show New Quote 
function newQuote() {
    loading();
// pick a random quote from api quotes array 
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// check if author field is blank and replace it with unknown
if(!quote.author){
    authorText.textContent = 'UnKnown';
}else {
    authorText.textContent = quote.author;
}

// check quote length to determine styling
if(quote.text.length > 120) {
    quoteText.classList.add('long-quote');
}
else {
    quoteText.classList.remove('long-quote');
}
// set quote. hide loader
quoteText.textContent = quote.text;
complete();
}

// Get Quote from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
     const response = await fetch(apiUrl);
     apiQuotes = await response.json();
     newQuote();
     //console.log(apiQuotes[12]);
    }
    catch(error) {
         //Catch error here
    }
}

// tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load 
getQuotes();
