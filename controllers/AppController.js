// const express = require('express');
const { promisify } = require('util');
const redis = require('redis');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// const router = express.Router();

const dbUtils = {
  isAlive: async () => true,
  nbUsers: async () => 12,
  nbFiles: async () => 1231,
};

const redisUtils = {
  isAlive: () => client.connected,
  nbUsers: async () => getAsync('nb_users'),
  nbFiles: async () => getAsync('nb_files'),
};

const AppController = {
  getStatus: async (req, res) => {
    try {
      const [dbStatus, redisStatus] = await Promise.all([
        dbUtils.isAlive(),
        redisUtils.isAlive(),
      ]);
      res.status(200).send({ redis: redisStatus, db: dbStatus });
    } catch (err) {
      res.status(500).send({ redis: false, db: false });
    }
  },

  getStats: async (req, res) => {
    try {
      const [nbUsers, nbFiles] = await Promise.all([
        dbUtils.nbUsers(),
        dbUtils.nbFiles(),
      ]);
      res.status(200).send({ users: nbUsers, files: nbFiles });
    } catch (err) {
      res.status(500).send({ users: 0, files: 0 });
    }
  },
};

module.exports = AppController;
