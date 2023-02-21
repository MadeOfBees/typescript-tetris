import "../index"
import { newUser, allUsers, userbyID, deleteByID, deleteAll, isValidUser } from '../controllers/user-controller.js';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return newUser(req, res);
    case 'GET':
      if (req.query.id) {
        return userbyID(req, res);
      } else if (req.query.isValid) {
        return isValidUser(req, res);
      } else {
        return allUsers(req, res);
      }
    case 'DELETE':
      if (req.query.id) {
        return deleteByID(req, res);
      } else {
        return deleteAll(req, res);
      }
    default:
      res.status(405).end();
  }
}