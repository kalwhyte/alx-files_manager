import sha1 from 'sha1';
import dbClient from '../utils/db';

export const postNew = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  const Users = dbClient._db.collection('user');
  let user = await Users.findOne({ email });

  if (user) return res.status(400).json({ error: 'Already exist' });

  const hashedPassword = sha1(password);
  console.log(hashedPassword);
  await Users.insertOne({ email, password: hashedPassword });
  user = await Users.findOne({ email });

  return res.status(201).json({ id: user._id, email: user.email });
};

export const dummyFunc = 0;
