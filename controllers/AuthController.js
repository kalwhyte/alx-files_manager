import sha1 from 'sha1';
import dbClient from '../utils/db';

export const connect = async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  const [email, password] = authHeader.split(':');
  const Users = dbClient._db.collection('users');
  const user = Users.findOne({ email, password: sha1(password) });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  // TODO: complete when you charge battery
};

export const disconnect = async (req, res) => {};
