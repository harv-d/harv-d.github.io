const searchForm = document.querySelector("#searchForm");
const message = document.querySelector("#message");
const results = document.querySelector("#results");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let characterName = document.querySelector("#characterName").value.trim();
    let species = document.querySelector("#species").value;

    message.textContent = "";
    results.innerHTML = "";

    if (characterName === "") {
        message.textContent = "Please enter a character name.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Searching for characters...";
    message.style.color = "black";
    
    fetchCharacters(characterName, species);
});

async function fetchCharacters(characterName, species) {
    let url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`;

    if (species !== "") {
        url += `&species=${encodeURIComponent(species)}`;
    }

    try {
        let response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                message.textContent = "No characters found.";
                message.style.color = "red";
                return;
            }
            throw new Error("Unable to retrieve character data.");
        }

        let data = await response.json();

        displayCharacters(data.results);
                
        message.textContent = `Found ${data.info.count} matching characters!`;
        message.style.color = "green";

    } catch (error) {
        message.textContent = "An error occurred while retrieving characters.";
        message.style.color = "red";
        console.error(error);
    }
}

function displayCharacters(characters) {
    results.innerHTML = "";

    characters.forEach(function(character) {
        let card = document.createElement("div");
        card.classList.add("character-card");

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p><strong>Status:</strong> ${character.status}</p>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Location:</strong> ${character.location.name}</p>
        `;

        results.appendChild(card);
    });
}