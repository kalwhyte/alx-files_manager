import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get /connect should sign-in the user by generating a new authentication token
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getConnect = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Decode base64 string
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [email, password] = credentials.split(':');
 ud4duu   
  // Check if user exist
  const user = await dbClient._db.users.findOne({ email, password: sha1(password) });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // Generate a random string(using uuidv4) as token
  const token = uuidv4();
  const key = `auth_${token}`;

  // Store the token in Redis with an expiration value of 24 hours
  await redisClient.set(key, user._id.toString(), 86400);

  return res.status(200).json({ token });
};

/**
 * Get /disconnect should sign-out the user based on the token
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getDisconnect = async (req, res) => {
  const token = req.headers['x-token'];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const id = await redisClient.get(`auth_${token}`)
