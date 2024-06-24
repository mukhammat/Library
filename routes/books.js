const router = require('express').Router();
const { validateBook } = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');
const {
    createBook,
    getAllBooks,
    getBookById,
    putBook,
    deleteBook,
} = require('../controller/books');

// Аутентификация для всех маршрутов
//router.use(authenticate);

// Маршруты с валидацией
router.post('/book', validateBook, createBook);
router.put('/books/:id', validateBook, putBook);

// Маршруты без валидации
router.get('/books', getAllBooks);
router.get('/book/:id', getBookById);
router.delete('/books/:id', deleteBook);

module.exports = router;
