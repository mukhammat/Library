const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        maxlength: [20, 'Username cannot be more than 20 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        default: 'user',
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
