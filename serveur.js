const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'html')));

app.get('/page-accueil', (req, res) => {
    res.sendFile(path.join(__dirname, './html/page-accueil.html'));
});

app.get('/inscription', (req, res) => {
    res.sendFile(path.join(__dirname, './html/inscription.html'));
});

app.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, './html/connexion.html'));
});

app.listen(5001, () => {
    console.log('Server is running on http://127.0.0.1:5001');
});