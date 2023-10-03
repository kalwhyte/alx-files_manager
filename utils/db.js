import MongoClient from 'mongodb/lib/mongo_client';

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || '27017';
    const dbDatabase = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${dbHost}:${dbPort}`;
    this._client = new MongoClient(uri);
    (async () => {
      await this._client.connect();
      this._db = this._client.db(dbDatabase);
    })();
  }

  /**
   * Check if client is connected
   * @returns {Boolean} true|false
   */
  isAlive() {
    return this._client.isConnected();
  }

  /**
   * Get the number of user in the users collection
   * @returns {Number} user counts
   */
  async nbUsers() {
    const result = await this._db.collection('users').countDocuments({});
    return result;
  }

  /**
   * Get the number of files in the files collection
   * @returns {Number} files count
   */
  async nbFiles() {
    const res = await this._db.collection('files').countDocuments({});
    return res;
  }
}

const dbClient = new DBClient();
export default dbClient;
