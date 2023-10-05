import sha1 from 'sha1';
import mongo from 'mongodb';

import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const postNew = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  const Users = dbClient._db.collection('users');
  let user = await Users.findOne({ email });

  if (user) return res.status(400).json({ error: 'Already exist' });

  const hashedPassword = sha1(password);
  await Users.insertOne({ email, password: hashedPassword });
  user = await Users.findOne({ email });

  return res.status(201).json({ id: user._id, email: user.email });
};

/**
 * ## getMe
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getMe = async (req, res) => {
  const token = req.header('x-token');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // get user id from redis
  const key = `auth_${token}`;

  const id = await redisClient.get(key);
  if (!id) return res.status(401).json({ error: 'Unauthorized' });

  // get user from db
  const user = await dbClient._db
    .collection('users')
    .findOne({ _id: mongo.ObjectId(id) });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  return res.status(200).json({ id: user._id, email: user.email });
};
