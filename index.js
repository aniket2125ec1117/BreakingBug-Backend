const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

require('./database.js'); 

const app = express();
const {router} = require("./routes/route.js");

const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
