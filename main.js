import dbClient from './utils/db';

async function getFile() {
  const Files = dbClient._db.collection('files');
  const file = Files.aggregate([
    { $match: { parentId: 0 } },
    {
      $project: {
        _id: 0,
        id: '$_id',
        userId: 1,
        name: 1,
        type: 1,
        parentId: 1,
        isPublic: 1,
      },
    },
  ]);
  console.log(await file.toArray());
}

setTimeout(async () => {
  await getFile();
}, 2000);
