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

app.get('/nasa', async (req, res) => {
    let url = "https://science.nasa.gov/wp-json/wp/v2/apod-basic?page=1&per_page=1";

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`NASA API Error: ${response.status}`);
        }

        let data = await response.json();
        let nasaInfo = data[0];

        res.render('nasa', { nasaInfo, error: null });

    } catch (error) {
        console.error(error.message);

        res.render('nasa', {
            nasaInfo: null,
            error: "NASA's API is temporarily unavailable. Please try again later."
        });
    }
});
