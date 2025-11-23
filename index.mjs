import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { "image": randomImage })
});

// Gets planet info using npm-solarsystem by planet name
// Adds name property to result
const getPlanetHelper = (name) => {
    let planet;
    name = name.toLowerCase();
    switch (name) {
        case 'mercury':
            planet = planets.getMercury();
            break;
        case 'venus':
            planet = planets.getVenus();
            break;
        case 'earth':
            planet = planets.getEarth();
            break;
        case 'mars':
            planet = planets.getMars();
            break;
        case 'jupiter':
            planet = planets.getJupiter();
            //fix broken image link
            planet.image = "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter_OPAL_2024.png";
            break;
        case 'saturn':
            planet = planets.getSaturn();
            break;
        case 'uranus':
            planet = planets.getUranus();
            break;
        case 'neptune':
            planet = planets.getNeptune();
            break;
        default:
            break;
    }
    planet.name = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(planet);
    return planet;
}

app.get('/mercury', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/venus', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/earth', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/mars', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/jupiter', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/saturn', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/uranus', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/neptune', (req, res) => {
    const planetName = req.route.path.slice(1);
    res.render('planet', { "planet": getPlanetHelper(planetName) });
});

app.get('/nasa', async (req, res) => {
    const apiKey = '9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD';
    const today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    let response = await fetch(url);
    let data = await response.json();
    const nasa = {
        title: data.title,
        explanation: data.explanation,
        url: data.url
    }
    res.render('nasa', { nasa });
});

app.listen(3000, () => {
    console.log('server started');
});
