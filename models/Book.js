const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more then 20 characters'],
    },
    author: {
        type: String,
        default: false,
    },
    publicationDate: {
        type: String,
        default: false,
    },
    genres: {
        type: String,
    },
});

module.exports = mongoose.model('Book', bookSchema);
