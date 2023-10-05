/* eslint-disable object-curly-newline */
import fs from 'fs';
import { v1 as uuidv4 } from 'uuid';
import path from 'path';
import { ObjectID } from 'mongodb';

import { promisify } from 'util';
import dbClient from '../utils/db';

/**
 * upload file
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const postUpload = async (req, res) => {
  const { user } = req;
  const types = ['folder', 'file', 'image'];
  // eslint-disable-next-line object-curly-newline
  const { name, type, data, parentId, isPublic } = req.body;

  if (!name) return res.status(400).json({ error: 'Missing name' });
  if (!types.includes(type)) return res.status(400).json({ error: 'Missing type' });
  if (!data && type !== 'folder') return res.status(400).json({ error: 'Missing data' });

  if (parentId) {
    console.log(parentId);
    const files = await dbClient._db.collection('files').findOne({
      _id: new ObjectID(parentId),
    });
    console.log(files);
    if (!files) return res.status(400).json({ error: 'Parent not found' });

    if (files.type !== 'folder') {
      return res.status(400).json({ error: 'Parent is not a folder' });
    }
  }

  if (type === 'folder') {
    let folder = await dbClient._db.collection('files').insertOne({
      userId: user._id,
      name,
      type,
      parentId: parentId || 0,
      isPublic: isPublic || false,
    });
    folder = await dbClient._db
      .collection('files')
      .findOne({ _id: ObjectID(folder.insertedId) });

    return res.status(201).json({
      id: folder._id,
      userId: folder.userId,
      name: folder.name,
      type: folder.type,
      parentId: folder.parentId,
      isPublic: folder.isPublic,
    });
  }
  // get the folder path from the env var or use the default
  const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager';

  // check if dir exist and create it if it does not
  if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH);
  } else if (!fs.statSync(FOLDER_PATH).isDirectory) fs.mkdirSync(FOLDER_PATH);

  const fileName = uuidv4();
  const localPath = `${FOLDER_PATH}/${fileName}`;
  const buff = Buffer.from(data, 'base64');
  const writeFile = promisify(fs.writeFile);
  await writeFile(localPath, buff);
  const absPath = path.resolve(localPath);

  let file = await dbClient._db.collection('files').insertOne({
    userId: user._id,
    name,
    type,
    parentId: parentId || 0,
    isPublic: isPublic || false,
    localPath: absPath,
  });
  file = await dbClient._db
    .collection('files')
    .findOne({ _id: ObjectID(file.insertedId) });

  return res.status(201).json({
    id: file._id,
    userId: file.userId,
    name: file.name,
    type: file.type,
    parentId: file.parentId,
    isPublic: file.isPublic,
  });
};

/**
 * ### getShow
 * Retrieves the file document based on the id
 * @param {Request} req object
 * @param {Response} res object
 * @returns {Promise<Response>}
 */
export const getShow = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const Files = dbClient._db.collection('files');
  const file = await Files.findOne({ _id: ObjectID(id), userId: user.id });

  if (!file) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(201).json({
    id: file._id,
    userId: file.userId,
    name: file.name,
    type: file.type,
    parentId: file.parentId,
    isPublic: file.isPublic,
  });
};

/**
 * ### getIndex
 * Retrieves the file document based on the id
 * @param {Request} req object
 * @param {Response} res object
 * @returns {Promise<Response>}
 */
export const getIndex = async (req, res) => {
  const { userId } = req;
  const { parentId, page } = req.body;

  const Files = dbClient._db.collection('files');

  // TODO: fix aggregate
  const files = await Files.aggregate([
    { $match: { userId: mongo.ObjectID(userId), parentId: mongo.ObjectID(parentId) } },
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
    { $skip: page * 20 },
    { $limit: 20 },
  ]).toArray();

  return res.status(201).json(files);
};
