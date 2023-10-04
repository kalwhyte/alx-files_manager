import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this._client = createClient();
    this._client.on('error', (error) => {
      console.log(error);
    });
  }

  isAlive() {
    return this._client.connected;
  }

  async get(key) {
    const gets = promisify(this._client.get).bind(this._client);
    const res = await gets(key);
    return res;
  }

  async set(key, value, duration) {
    const sets = promisify(this._client.set).bind(this._client);
    const res = await sets(key, value, 'EX', duration);
    return res;
  }

  async del(key) {
    const del = promisify(this._client.del).bind(this._client);
    const res = await del(key);
    return res;
  }
}

const redisClient = new RedisClient();
export default redisClient;
