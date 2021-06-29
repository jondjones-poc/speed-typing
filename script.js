const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement = document.getElementById('quote-input');
const timer = document.getElementById('timer');

const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

let startTime;

const getRandomQuote = async () => {
    const quote = await fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);

    return quote.includes('.') ? quote.substr(0, quote.length -1) : quote;
}

const getTime = () => {
    return Math.floor((new Date() - startTime) / 1000);
}

const startTimer = () => {
    timer.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTime();
    }, 1000)
}

const renderQuote = async () => {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';

    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplayElement.appendChild(charSpan)
    });

    quoteInputElement.value = null;
    startTimer()
}

quoteInputElement.addEventListener('input', () => {
    const quoteChars = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    
    let correct = true;

    quoteChars.forEach((span, index) => {
        const character = arrayValue[index];

        if (character == null) {
            span.classList.remove('incorrect'); 
            span.classList.remove('correct');  
            correct = false;
        } else if (character === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
        } else {
            span.classList.add('incorrect');
            span.classList.remove('correct');  
            correct = false;
        }
    })

    
    if (correct) renderQuote()
})

renderQuote();