import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export const status = async (req, res) => {
  res.json({
    redis: redisClient.isAlive(),
    db: dbClient.isAlive(),
  });
};
export const stats = async (req, res) => {
  res.json({
    users: await dbClient.nbUsers(),
    files: await dbClient.nbFiles(),
  });
};
