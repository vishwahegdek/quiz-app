const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const routes = require('./routes');

app.use('/', routes);
app.use(express.json());

app.get('/', (req, res) => {
    // Read the HTML file
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the HTML content as a response
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
