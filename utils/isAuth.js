import mongo from 'mongodb';
import dbClient from './db';
import redisClient from './redis';

/* eslint-disable import/prefer-default-export */
export async function isAuth(req, res) {
  const token = req.header('x-token');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // get the user_id from redis
  const key = `auth_${token}`;

  const id = await redisClient.get(key);
  if (!id) return res.status(401).json({ error: 'Unauthorized' });

  // get user from db
  const user = await dbClient._db
    .collection('users')
    .findOne({ _id: mongo.ObjectId(id) });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  return user;
}
