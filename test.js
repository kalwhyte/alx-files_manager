import dbClient from './utils/db';

async function runIt() {
  const parentId = 0;
  const user = await dbClient._db.collection('files').findOne({
    parentId,
  });
  console.log(user);
}

setTimeout(() => runIt(), 5000);
