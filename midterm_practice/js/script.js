let currentQuote;

async function getRandomQuote() {

    const url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";

    const response = await fetch(url);
    const data = await response.json();

    currentQuote = data;

    document.querySelector("#quote").textContent = data.quoteText;
    document.querySelector("#author").textContent =
        data.firstName + " " + data.lastName;
}

document.querySelector("#authorBtn").addEventListener("click", function() {

    if (!currentQuote) {
        return;
    }

    document.querySelector("#authorPicture").src = currentQuote.picture;
    document.querySelector("#authorBio").textContent = currentQuote.bio;
    document.querySelector("#authorInfo").style.display = "flex";
});

document.querySelector("#authorInfo").style.display = "none";

getRandomQuote();

const languages = [
    { name: "English", code: "EN" },
    { name: "Esperanto", code: "ES" },
    { name: "French", code: "FR" },
    { name: "Spanish", code: "SP" }
];

function displayLanguages() {

    // Shuffle the languages
    languages.sort(() => Math.random() - 0.5);

    // Generate the radio buttons
    for (let language of languages) {
        document.querySelector("#languageOptions").innerHTML += `
            <label>
                <input type="radio" name="language" value="${language.code}">
                ${language.name}
            </label>
        `;
    }
}

displayLanguages();

document.querySelector("#translateBtn").addEventListener("click", async function() {

    const selectedLanguage =
        document.querySelector('input[name="language"]:checked');

    if (!selectedLanguage) {
        alert("Please select a language.");
        return;
    }

    if (!currentQuote) {
        return;
    }

    const languageCode = selectedLanguage.value;
    const quoteId = currentQuote.quoteId;

    const flags = {
        EN: "english.png",
        ES: "esperanto.png",
        FR: "french.png",
        SP: "spanish.png"
    };
    
    const flagFile = flags[languageCode];
    
    document.querySelector("#languageFlag").src = `img/flags/${flagFile}`;  
    document.querySelector("#languageFlag").hidden = false;  

    const url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=${languageCode}&quoteId=${quoteId}`;
    
    const response = await fetch(url);
    const data = await response.json();

    document.querySelector("#translatedQuote").textContent = data.translation;
});

document.querySelector("#getQuotesBtn").addEventListener("click", async function() {

    const quoteCount = document.querySelector("#quoteCount").value.trim();
    const errorMessage = document.querySelector("#quoteError");

    errorMessage.textContent = "";

    if (quoteCount === "" || !Number.isInteger(Number(quoteCount)) ||
        Number(quoteCount) < 1 || Number(quoteCount) > 5) {

        errorMessage.textContent = "Please enter a whole number between 1 and 5.";
        return;
    }

    const url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${quoteCount}`;

    const response = await fetch(url);
    const data = await response.json();
    const quotesList = document.querySelector("#quotesList");

    quotesList.innerHTML = "";

    for (let quote of data) {
        quotesList.innerHTML += `
            <p>${quote.quoteText}</p>
            <p>— ${quote.firstName} ${quote.lastName}</p>
            <hr>
        `;
    }
});

async function getRandomBackground() {

    const url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers";

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.hits.length > 0) {

        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const randomImage = data.hits[randomIndex];
    
        document.body.style.backgroundImage =
            `url("${randomImage.largeImageURL}")`;
    }
}

getRandomBackground();