import { Scores } from '../models/scores';
import connectionJS from '../../../utils/connection'

export async function newScore(req, res) {
    try {
        const db = await connectionJS();
        const newScore = await Scores.create(req.body);
        res.status(200).json({ message: 'Score created successfully', newScore });
        db.disconnect();
    } catch (error) {
        res.status(500).json({ message: 'Error creating score', error });
    }
}

export async function scorebyID(req, res) {
    if (req.body.password === process.env.SPASSWORD) {
        try {
            const db = await connectionJS();
            const score = await Scores.findById(req.params.id);
            res.status(200).json({ message: 'Score retrieved successfully', score });
            db.disconnect();
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving score', error });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized user, access denied.' });
    }
}

export async function allScores(req, res) {
    if (req.body.password === process.env.SPASSWORD) {
        try {
            const db = await connectionJS();
            const scores = await Scores.find();
            res.status(200).json({ message: 'Scores retrieved successfully', scores });
            db.disconnect();
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving scores', error });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized user, access denied.' });
    }
}

export async function topTenScores(req, res) {
    try {
        const db = await connectionJS();
        const scores = await Scores.find().sort({ score: 1 }).limit(10);
        res.status(200).json({ message: 'Top ten scores retrieved successfully', scores });
        db.disconnect();
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving top ten scores', error });
    }
}

export async function todaysTopTenScores(req, res) {
    try {
        const db = await connectionJS();
        const currentDate = new Date();
        const offset = -5;
        const estTime = new Date(currentDate.getTime() + offset * 60 * 60 * 1000);
        const scores = await Scores.find({ timestamp: { $gte: estTime } }).sort({ score: 1 }).limit(10);
        res.status(200).json({ message: 'Top ten scores retrieved successfully', scores });
        db.disconnect();
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving top ten scores', error });
    }
}

export async function deleteByID(req, res) {
    if (req.body.password === process.env.SPASSWORD) {
        try {
            const db = await connectionJS();
            const score = await Scores.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Score deleted successfully', score });
            db.disconnect();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting score', error });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized user, access denied.' });
    }
}

export async function deleteAll(req, res) {
    if (req.body.password === process.env.SPASSWORD) {
        try {
            const db = await connectionJS;
            const scores = await Scores.deleteMany();
            res.status(200).json({ message: 'Scores deleted successfully', scores });
            db.disconnect();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting scores', error });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized user, access denied.' });
    }
}

export async function seeAllUserScores(req, res) {
    if (req.body.password === process.env.SPASSWORD) {
        try {
            const db = await connectionJS;
            const scores = await Scores.find({ userID: req.params.id });
            res.status(200).json({ message: 'Scores retrieved successfully', scores });
            db.disconnect();
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving scores', error });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized user, access denied.' });
    }
}

export async function deleteAllByUser(req, res) {
    if (req.body.password === process.env.SPASSWORD) {
        try {
            const db = await connectionJS;
            const scores = await Scores.deleteMany({ userID: req.params.id });
            res.status(200).json({ message: 'Scores deleted successfully', scores });
            db.disconnect();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting scores', error });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized user, access denied.' });
    }
}