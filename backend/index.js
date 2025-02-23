const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the NASA Data Explorer Backend!');
});

app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

app.get('/mars-rover-photos', async (req, res) => {
    try {
        const { earth_date } = req.query;
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earth_date}&api_key=${NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
