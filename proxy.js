const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/dropbox-proxy', async (req, res) => {
    try {
        const response = await axios.get(
            'https://www.dropbox.com/scl/fi/q9dqqu1u37hvgbhub3bgm/tasks.opml?rlkey=5pnianllu0eoz5ex2y0uqi3mo&dl=1'
        );
        res.send(response.data);
    } catch (err) {
        res.status(500).send('Error fetching the file.');
    }
});

app.listen(4000, () => {
    console.log('Proxy server running on port 4000');
});
