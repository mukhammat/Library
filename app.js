const express = require('express');
const books = require('./routes/books');
const auth = require('./routes/auth');
const connectDB = require('./db/connect');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(auth);
app.use(books);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
