const {Schema, model} = require('mongoose');

const scoresSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Scores = model('Scores', scoresSchema);

module.exports = {Scores};