const {Schema, model, models} = require('mongoose');

const userSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = models.User || model('User', userSchema);

module.exports = {User};