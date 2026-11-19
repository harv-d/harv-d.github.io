import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let apiKey = "J0dV5BvfuSsMeS9z4hQ7XHQU4NJm1Tvtn3OadlAhfCw";

    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;

    let response = await fetch(url);
    let data = await response.json();
    
    let randomImage = data.urls.full;

    res.render('index', { image: randomImage });
});

app.listen(3000, () => {
    console.log('server started');
});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();

    res.render('planet', { planetInfo, planetName });
});