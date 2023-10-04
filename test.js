import dbClient from './utils/db';

async function runIt() {
  const user = await dbClient._db.collection('users').findOne({
    email: 'jojothomas1515@gmail.com',
  });
  console.log(user);
}

setTimeout(() => runIt(), 5000);
