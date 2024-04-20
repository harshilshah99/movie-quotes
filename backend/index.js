const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const movieQuotes = require('./quotes.json'); // Assuming movieQuotes.json is in the same directory

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Search endpoint
app.get('/search', (req, res) => {
  const query = req.query.query.toLowerCase();

  // Check if movieQuotes and movieQuotes.dialogues are defined
  if (movieQuotes && movieQuotes.dialogues) {
    // Filter the dialogues array based on the query
    const results = movieQuotes.dialogues.filter(quote =>
      quote.dialogue.toLowerCase().includes(query)
    );
    res.json(results);
  } else {
    res.status(500).json({ error: 'Movie quotes data is not formatted correctly' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
