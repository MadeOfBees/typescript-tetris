import { newScore, scorebyID, allScores, topTenScores, deleteByID, deleteAll, todaysTopTenScores, seeAllUserScores, deleteAllByUser } from './controllers/scores.js';

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return newScore(req, res);
        case 'GET':
            if (req.query.id) {
                return scorebyID(req, res);
            } else if (req.query.topTen) {
                return topTenScores(req, res);
            } else if (req.query.todaysTopTen) {
                return todaysTopTenScores(req, res);
            } else if (req.query.user) {
                return seeAllUserScores(req, res);
            } else {
                return allScores(req, res);
            }
        case 'DELETE':
            if (req.query.id) {
                return deleteByID(req, res);
            } else if (req.query.user) {
                return deleteAllByUser(req, res);
            } else {
                return deleteAll(req, res);
            }
        default:
            res.status(405).end();
    }
}

