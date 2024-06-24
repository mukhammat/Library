const Book = require('../models/Book');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../error/custom-error');

const createBook = asyncWrapper(async (req, res) => {
    const books = await Book.find({});
    res.status(200).json({ books });
});

// Получение всех книг
const getAllBooks = asyncWrapper(async (req, res) => {
    const books = await Book.find({});
    res.status(200).json({ books });
});

// Добавления книги
const getBookById = asyncWrapper(async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.status(201).json({ book });
});

// Обновление книги по ID
const putBook = asyncWrapper(async (req, res, next) => {
    const { id: projectID } = req.params;
    const project = await Book.findOneAndUpdate({ _id: projectID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!project) {
        return next(createCustomError(`No book with id: ${projectID}`, 404));
    }
    res.status(200).json({ project });
});

// Удаление проекта по ID
const deleteBook = asyncWrapper(async (req, res, next) => {
    const { id: projectID } = req.params;

    const project = await Book.findByIdAndDelete(projectID);

    if (!project) {
        return next(createCustomError(`No book with id: ${projectID}`, 404));
    }

    res.json({ message: 'Book deleted successfully' });
});

const getHomePage = (req, res) => {
    res.render('index', {
        title: 'NodeMaster',
        projects: Book,
    });
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    putBook,
    deleteBook,
    getHomePage,
};
