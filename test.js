import dbClient from './utils/db';

async function runIt() {
  const parentId = 0;
  const user = dbClient._db
    .collection('files')
    .aggregate([{ $match: { parentId } }, { $project: { _id: 0, id: '$_id' } }]);

  // console.log(await user[1]);
  // for await (const i of user) {
  //   console.log(i);
  // }
}

setTimeout(() => runIt(), 5000);
