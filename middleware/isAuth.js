import mongo from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/* eslint-disable import/prefer-default-export */
export async function isAuth(req, res, next) {
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

  req.user = user;
  return next();
}
