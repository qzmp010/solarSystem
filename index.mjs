import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let randomImage;
    try {
        //let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
        let apiKey = "aHzCm7p89Sp87H7h_oZc8eyXMXstvdK7HxwTfXvrvKY";
        let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
        let response = await fetch(url);
        let data = await response.json();
        randomImage = data.urls.full;
    } catch {
        //default image if rate limit exceeded
        randomImage = "https://upload.wikimedia.org/wikipedia/commons/4/43/PIA22835-VoyagerProgram%26Heliosphere-Chart-20181210.png";
    }
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
            //fix broken image link
            planet.image = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png";
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
    const apiKey = 'BgDdlu9gwzekridpgp4Ey61W3eRhNKJwKW5G0jO2';
    const today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(date);
    console.log(data);
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
