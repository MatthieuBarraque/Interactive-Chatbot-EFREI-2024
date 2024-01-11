const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/inscription', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;