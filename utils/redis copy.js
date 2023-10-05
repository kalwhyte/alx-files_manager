/* eslint-disable no-return-await */
import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Redis client
 * @type {RedisClient}
 * @see
 */
const redisClient = createClient({
  host: '127.0.0.1',
  port: 6379,
});
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

redisClient.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

/**
 * Check if Redis client is alive
 * @return {boolean} true if client is alive, false otherwise
 * @see
 */
async function isAlive() {
  return new Promise((resolve, reject) => {
    redisClient.ping((error, reply) => {
      if (error) {
        reject(new Error('Redis client not connected to the server'));
      }
      if (reply === 'PONG') {
        resolve(true);
      }
    });
  });
}

/**
 * Get value by key
 * @param {string} key
 * @return {Promise<string>} value or null
 * @see
 */
async function get(key) {
  return await getAsync(key);
}

/**
 * Set key with value and expiration
 * @param {string} key
 * @param {string} value
 * @param {number} duration
 * @return {Promise<boolean>} true if key was set, false otherwise
 * @see
 */
async function set(key, value, duration) {
  return await setAsync(key, value, 'EX', duration);
}
async function del(key) {
  return await redisClient.del(key);
  // return await redisClient.del(key);
}

export default {
  client: redisClient,
  isAlive,
  get,
  set,
  del,
};
