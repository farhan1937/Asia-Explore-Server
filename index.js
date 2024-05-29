const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Asia tourist spot is running on');
});

app.listen(port, () => {
    console.log(`Asia tourist spot server is running on port: ${port}`);
});
