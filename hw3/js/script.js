const searchForm = document.querySelector("#searchForm");
const message = document.querySelector("#message");
const results = document.querySelector("#results");
const pagination = document.querySelector("#pagination");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const pageInfo = document.querySelector("#pageInfo");

let currentPage = 1;
let totalPages = 1;
let currentName = "";
let currentSpecies = "";

pagination.style.display = "none";

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
    
    currentName = characterName;
    currentSpecies = species;
    currentPage = 1;
    
    pagination.style.display = "none";
    
    fetchCharacters(currentName, currentSpecies, currentPage);
});


async function fetchCharacters(characterName, species, page = 1) {
    let url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}&page=${page}`;

    if (species !== "") {
        url += `&species=${encodeURIComponent(species)}`;
    }

    message.textContent = "Loading characters...";
    message.style.color = "black";

    results.innerHTML = "";
    pagination.style.display = "none";

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

        currentPage = page;
        totalPages = data.info.pages;

        let start = (currentPage - 1) * 20 + 1;
        let end = start + data.results.length - 1;

        message.textContent = `Showing ${start}-${end} of ${data.info.count} matching characters.`;
        message.style.color = "green";

        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        pagination.style.display = totalPages > 1 ? "flex" : "none";

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

prevBtn.addEventListener("click", function() {
    if (currentPage > 1) {
        fetchCharacters(currentName, currentSpecies, currentPage - 1);
    }
});

nextBtn.addEventListener("click", function() {
    if (currentPage < totalPages) {
        fetchCharacters(currentName, currentSpecies, currentPage + 1);
    }
});
